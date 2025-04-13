import { NextResponse } from 'next/server'
import { scoreGame } from '@/lib/scoreGame'

export async function POST(req: Request) {
    const { gameUrl } = await req.json()

    const placeIdMatch = gameUrl.match(/games\/(\d+)/)
    const placeId = placeIdMatch?.[1]
    
    if (!placeId) {
      return NextResponse.json({ error: 'Invalid game URL' }, { status: 400 })
    }
    
    // Convert placeId to universeId
    const universeRes = await fetch(`https://apis.roblox.com/universes/v1/places/${placeId}/universe`)
    const universeData = await universeRes.json()
    const universeId = universeData.universeId
    
    if (!universeId) {
      return NextResponse.json({ error: 'Could not resolve universe ID' }, { status: 404 })
    }

    const gameRes = await fetch(`https://games.roblox.com/v1/games?universeIds=${universeId}`)
    const gameData = await gameRes.json()
    const game = gameData?.data?.[0]
    console.log(gameRes, gameData)
    if (!game) {
        return NextResponse.json({ error: "No game found" }, { status: 404 })
    }

    const thumbRes = await fetch(`https://thumbnails.roblox.com/v1/games/icons?universeIds=${universeId}&size=512x512&format=Png&isCircular=false`)
    const thumbData = await thumbRes.json()

    const iconUrl = thumbData?.data?.[0]?.imageUrl || null

    // Score the game using the basic heuristic model
    const { score, breakdown } = await scoreGame({
        title: game.name,
        description: game.description,
        iconUrl,
        visits: game.visits,
        likes: game.likes,
        dislikes: game.dislikes
    })

    return NextResponse.json({
        title: game.name,
        creatorName: game.creator.name,
        visits: game.visits,
        likes: game.thumbUpCount,
        dislikes: game.thumbDownCount,
        playing: game.playing,
        description: game.description,
        iconUrl,
        score,
        breakdown,
    })
}