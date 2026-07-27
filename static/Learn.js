const posts = [
    { title: 'Post one', body:'This is post one'},
    { title: 'Post two', body:'This is post two'}
];

function getPosts(){
    setTimeout(() => {
        let output = " ";
        posts.forEach((post, index) =>{
            output += `<li>${post.title}</li>`+ `<li>${post.body}</li>`;
        });
        document.body.innerHTML = output;
    }, 1000);
}

function createPost(post, callbacks){
    setTimeout(() =>{
        posts.push(post);
        callbacks();
    }, 2000)
}

createPost({title:' Post three', body:'This is post three'}, getPosts);
