const fs = require('fs').promises;
const { promisify } = require('util');
const frontMatterParser = require('parser-front-matter');

const parse = promisify(frontMatterParser.parse.bind(frontMatterParser));

async function loadPostsWithFrontMatter(postsDirectoryPath) {
    const postNames = await fs.readdir(postsDirectoryPath);
    const posts = await Promise.all(
        postNames.map(async fileName => {
            const fileContent = await fs.readFile(
                `${postsDirectoryPath}/${fileName}`,
                'utf8'
            );
            const { content, data } = await parse(fileContent);
            return {
                content: content.slice(0, 3000),
                ...data
            };
        })
    );
    return posts;
}

const lunrjs = require('lunr');
require("lunr-languages/lunr.stemmer.support")(lunrjs)
require("lunr-languages/lunr.zh")(lunrjs)
function makeIndex(posts) {
    return lunrjs(function () {
        this.use(lunrjs.zh);
        this.ref('title');
        this.field('title', { boost: 10 });
        this.field('content');
        this.field('tags', { boost: 10 });
        posts.forEach(p => {
            this.add(p);
        });
        // posts = posts.filter((data) => data["title"] != undefined)
    });
}

async function run() {
    const posts = await loadPostsWithFrontMatter(`${__dirname}/site/content/post`);

    const index = makeIndex(posts);
    // console.log(index)
    // const lunrCn = lunr.init(index)
    // console.log(lunrCn.search('香港'))
    console.log(JSON.stringify(index));
}

run()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error.stack);
        process.exit(1);
    });