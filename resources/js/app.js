window.app ={
    init(){
        require('./bootstrap');
        require('./components/comments')
        require('./components/dropzone')
        // require('./components/clipboard')
        require('./components/feather')
    }
}

window.app.init();
