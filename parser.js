const {
  parse
} = require('node-html-parser');
const cheerio = require('cheerio')

function parseMembers(html) {
  const memberPage = parse(html)
  const frame = memberPage.querySelector('#mainContent')
  const timJFrame = frame.querySelectorAll('.post')[0]
  const members = []
  const timJProfiles = timJFrame.querySelectorAll('.profileWrap')
  timJProfiles.forEach(member => {
    members.push({
      name: member.querySelectorAll('a')[1].structuredText.split('\n').join(' '),
      imgURL: `https://jkt48.com${member.querySelector('img').attributes.src}`,
      team: 'J'
    })
  });
  const timKFrame = frame.querySelectorAll('.post')[1];
  const timKProfiles = timKFrame.querySelectorAll('.profileWrap');
  timKProfiles.forEach(member => {
    members.push({
      name: member.querySelectorAll('a')[1].structuredText.split('\n').join(' '),
      imgURL: `https://jkt48.com${member.querySelector('img').attributes.src}`,
      team: 'K3'
    })
  });
  const timTFrame = frame.querySelectorAll('.post')[2];
  const timTProfiles = timTFrame.querySelectorAll('.profileWrap');
  timTProfiles.forEach(member => {
    members.push({
      name: member.querySelectorAll('a')[1].structuredText.split('\n').join(' '),
      imgURL: `https://jkt48.com${member.querySelector('img').attributes.src}`,
      team: 'T'
    })
  });
  return members
}

function parseTrainees(html) {
  const traineesPage = cheerio.load(html);
  const trainees = []
  const regex = /<br>/gm
  traineesPage('table.table-member tr').each((i, e) => {
    const row = cheerio.load(e);
    row('td').each((i, col) => {
      const td = cheerio.load(col);
      const brokenName = td('p').html();
      const name = brokenName.replace(regex, ' ').trim()
      const imgURL = `https://jkt48.com${td('img').attr('src')}`;
      const team = 'Academy';
      trainees.push({
        name,
        imgURL,
        team
      })
    })
  })
  return trainees;
}

module.exports = {
  parseMembers,
  parseTrainees
}