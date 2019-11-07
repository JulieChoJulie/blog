import Post from './models/post';

export default function createFakeData() {
  const posts = [...Array(40).keys()].map(i => ({
    title: `post #${i}`,
    body:
    'Fake is a word to describe people who aren\'t themselves in order to gain friends and end up being more popular. They seem very nice to everyone, yet trash-talks them behind their back in order to get attention from people and make "friends" just to improve their social-status.\n' +
      'Sallie: Oh my word, I was telling Chelsea who I liked last night because she said we were besties and that I could trust her, but in History Class two of her friends were laughing at me and pointing at my crush! She is so fake. Ugh.\n' +
      '\n' +
      'RaeRae: Yeah! She just wants to be popular ! She posted a selfie of her and Annie, the cheerleader, captioned "love my bestie!" on her Insta but I heard they secretely hate eachother! Talk about fake!',
    tags: ['fake', 'data']
  }));
  Post.insertMany(posts, (err, docs) => {
    console.log(docs);
  });
}