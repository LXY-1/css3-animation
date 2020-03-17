<!--
 * @Description: 
 * @version: 
 * @Author: lxw
 * @Date: 2020-02-18 22:01:08
 * @LastEditors: lxw
 * @LastEditTime: 2020-02-24 22:57:12
 -->
#### 记录一些遇到的问题
1. 背景bacground的尺寸以及位移动相关问题
 
   1.1 背景位移的基准位置由`background-origin`决定，其默认值是:`padding-box`也就是说默认的基准点是在盒子的**左上角**.
   1.2 看看`background-position-x``background-position-y`设置值的移动效果，假使不改变基准点的位置。
   第一种带px这些单位的比如`(200px,100px)`表示背景图片基于基准点的向右边移动200px，向下100px；负值则相反。
   第二种，百分比，如果是百分比单位的话，移动的计算公式与上面略有不同，而且与背景的`size`也有关系。以backgorung-position-x为例，公式如下：
   `{容器(container)的宽度—背景图片的宽度}*background-position-x值`
   举个例子:
   ```css
    .gradient-btn-wrap button {
        outline: none;
        border: none;
        width: 180px;
        height: 60px;
        font-size: 24px;
        color: #fff;
        text-shadow: 0 0 10px #fff;
        transition: all 0.5s;
        background-size: 200%;
        position: relative;
 }
 .gradient-btn-wrap button:hover {
   background-position-x: 100%;
   transform: translateY(-15px);
 }
   ```
   此时background-position-x: 100%;的位置是在
   `(100% - 200%) * 100%` 也就是-100%,由于设置的background-size大于容器的宽度，所以此时容器宽度 - 背景图片的宽度 为负值，此时想要容器越往左移动，backgorund-positon-x就需要约到。

2. 利用背景圆形渐变制作小圆点，以及背景重叠制作好多小圆点
    2.1 背景圆形渐变制作小圆点
    ```css
    background-repeat: no-repeat;//背景不重叠
    background-image: radial-gradient(circle, #000 20%, transparent 20%);/*通关渐变制作圆点：由内向外20%黑色，20%透明*/
    background-size: 17% 10%; /*渐变原点的大小*/
    background-position: 20% 10%; /*渐变原点的位置*/
    ````
    2.2 利用背景重叠制作许多分布于盒子不同位置的小原点
    ```
      position: absolute;
            content: "";
            left: -2em;
            top: -2em;
            right: -2em;
            bottom: -2em;
            background-repeat: no-repeat;
            background-image: radial-gradient(circle, #000 20%, transparent 20%),radial-gradient(circle, transparent 20%, #000 20%, transparent 30%);
            background-size: 17% 10%, 12% 20%;
            background-position: 90% 10%,20% 31%;
    ```
    3. css3 制作形状的总结
    
      对于css 3 实现的形状，很明细可以用到的属性就是那些，那么比较复杂的形状是怎么做到，比如爱心，其实这要想能做形状的就下面这些：

      border bordr-radious ，不同边框、不同bordrradious的构造，部分显示，通过transform的平移、缩放、旋转，一个div不够，多个进行位置改变重组，最终形成需要的图形，位置的相关性，使得它们更适合使用相对于父级元素的绝对定位。

