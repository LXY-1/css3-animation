const cherryFalldownEffect = (function () {
    /**
         * @name: 
         * @description: 樱花花瓣生成，初始位置随机分布，以及css3相关动画部分控制
         * @msg: 
         * @param {Object}:opt
         * opt
         *  
         * @return: 
         */
        function cherryFalldown(opt) {
            let option = {
                width: 60,
                height: 33,
                baseImgSrc: './less/cherry-blossoms-falling/imgs/',
                imgs: ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png'],
                lineNUm: 3,
                minSpeed: 30,
                maxSpeed: 80
            }
            option = Object.assign(option, opt)
            console.log(option)
            const wrapEle = document.getElementById('cherry-img-wrap')
            const wrapWidth = wrapEle.offsetWidth
            const wrapHeight = wrapEle.offsetHeight
            // const width = 90//图片默认宽度
            // const height = 53 // 图片默认高度
            // const baseImgSrc = './less/cherry-blossoms-falling/imgs/'
            // const imgs = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png']
            const num = parseInt(wrapWidth / option.width) - 3
            const lineTotalNum = parseInt(wrapHeight / option.height)
            // const lineNUm = 3 // 需要铺满的行数
            // max min ：分别控制花瓣初始位置：初始花瓣的transfromY的数值，，通过它控制花瓣开始的隐藏位置
            const max = - (option.height * 5) + option.height
            const min = - (8 * option.height)
            // const minSpeed = 60 // px/s
            // const maxSpeed = 120 //px/s
            let minTime = parseInt(wrapHeight / option.maxSpeed)
            let maxTime = parseInt(wrapHeight / option.minSpeed)
            let cnum = 0


            // css3主要实现动画，但是由于很多随机的地方需要控制：css3是不可能实现的：比如每一个花瓣结束动画时间不同：范围：7-10s
            // 每一个花瓣的初始状态：初始位置分布：按照花瓣初始下落特点：范围 -200 - -50
            // 既然是动画是css3实现的，这个动画过程里面改变什么状态也就是百分之多少是什么css属性都是js控制不来的，你要控制，那你只能做多个动画
            // 在通过js随机把这些动画通过动画属性的name属性赋值给那些花瓣元素
            // 切记：css3动画，不过你什么状态：动结束它只会认你给它设置的时间，所以时间控制很重要，随机的地方，取一个合适的随机范围
            // 这里的话：我使用一个下落速度-慢下落变量可以自己控制最；10px/s ，最慢时间就有了，最快下落速度，每秒50px/s，这样时间范围就有了 
            // 这是一个 宽度：11 x 8 的网格系统， 每一个网格的大小：115px x 73px
            //随机left ： 0 - num-1  ， 随机top: 0 - lineTotalNum-1
            for (let j = 0; j < option.lineNUm; j++) {
                for (let i = 0; i < num; i++) {
                    cnum++;
                    let imgele = document.createElement('img')
                    let ind = i % 6;
                    imgele.src = option.baseImgSrc + option.imgs[ind]
                    imgele.width = option.width + ''
                    imgele.height = option.height + ''
                    imgele.style.transform = `translateY(${Math.random() * (max - min + 1) + min}px)`
                    imgele.style.animationDuration = `${Math.random() * (maxTime - minTime + 1) + minTime}s`
                    // 随机取img 赋值带自旋的动画名称：使得一些花瓣下落有自旋效果
                    let numAvg = parseInt((option.lineNUm * num) / 2) //
                    let randNum = parseInt(Math.random() * numAvg)
                    if (cnum < num + 1) {
                        if (i % 2 === 0) {
                            imgele.style.animationName = 'falldown1'
                        } else {
                            imgele.style.animationName = 'falldown2'
                        }
                    }
                    // 对第二行其的花朵动画进行延迟,，以及第一行部分花瓣进行动画延迟
                    if (j > 0) {
                        imgele.style.animationDelay = `${Math.random() * 3 + 1}s`
                    } else {
                        if (i % 2 === 0) {
                            imgele.style.animationDelay = `${Math.random() * 3 + 1}s`
                        }
                    }

                    wrapEle.appendChild(imgele)
                }

            }
        }
        return cherryFalldown
})()
