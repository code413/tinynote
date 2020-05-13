window.app ={
    init(){
        require('./bootstrap');
        require('./utilities/comments')
        require('./utilities/dropzone')
        // require('./components/clipboard')
    }
}

window.app.init();
