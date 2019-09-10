const axios = require('axios');
const parser = require('./parser')

async function parseMembers() {
  const members = axios.get('https://jkt48.com/member/list?lang=id')
  const trainees = axios.get('https://jkt48.com/jkt48-academy/member-academy')

  const pages = await Promise.all([members, trainees])
  const membersArray = parser.parseMembers(pages[0].data)
  const traineesArray = parser.parseTrainees(pages[1].data)
  const allMembers = membersArray.concat(traineesArray)
  return allMembers
}


module.exports.getAllMembers = async (req, res) => {
  const members = await parseMembers();
  console.info(`members result: ${JSON.stringify(members, null, 2)}`);
  res.json(members);
}
