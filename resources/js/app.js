window.app ={
    init(){
        require('./bootstrap');
        require('./components/comments')
        require('./components/dropzone')
    }
}

window.app.init();
