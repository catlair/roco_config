export async function getNewPet() {
  const res = await fetch('/api/roco/pet?type=all&pn=1&ps=12')
  return res.json()
}
