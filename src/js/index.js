import './../css/index.css'
require(['./common.js'], (common) => {
    common.initIndex();
    $(() => {
        console.log('this is jquery');
    })
})