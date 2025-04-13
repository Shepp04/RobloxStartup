export async function scoreGame(game: {
    title: string,
    description: string,
    iconUrl: string,
    visits: number,
    likes: number,
    dislikes: number
}) {

    let score = 0;
    const breakdown: string[] = []

   // Title length
   if (game.title.length >= 5 && game.title.length <= 35) {
    score += 10
    breakdown.push("✅ Title is a good length")
  } else {
    breakdown.push("⚠️ Title may be too short or long")
  }

  // Description
  if (game.description && game.description.length > 30) {
    score += 10
    breakdown.push("✅ Description looks informative")
  } else {
    breakdown.push("⚠️ Description is missing or too short")
  }

  // Likes/dislikes
  const totalVotes = game.likes + game.dislikes
  const ratio = totalVotes > 0 ? game.likes / totalVotes : 0
  if (ratio >= 0.8 && totalVotes > 10) {
    score += 15
    breakdown.push("✅ Positive like ratio")
  } else if (ratio >= 0.6 && totalVotes > 5) {
    score += 10
    breakdown.push("⚠️ Decent like ratio")
  } else {
    breakdown.push("⚠️ Low like ratio or no engagement")
  }

  // Visit count
  if (game.visits >= 1000) {
    score += 10
    breakdown.push("✅ Game has social proof (visits)")
  } else if (game.visits >= 100) {
    score += 5
    breakdown.push("⚠️ Some visits, but not much traffic yet")
  } else {
    breakdown.push("⚠️ Low or no visits")
  }

  return { score, breakdown }
}