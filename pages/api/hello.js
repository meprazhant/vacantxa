// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  var pass = '123'
  var rand = process.env.NEXT_PUBLIC_RANDOM
  if (pass === rand) {
    res.status(200).json({ name: 'John Doe' })
  } else {
    res.status(404).json({ error: "Unauthorized" });
  }
}
