### 一阶段rem方案：

使用目前比较好的hotcss方案来实现移动端布局，布局使用rem，文字根据dpr使用不同的px大小

* 关于rem计算： 本demo中使用的是我自己写的gulp插件 “gulp-rem”来计算，只要在gulpfile配置文件里填写你的视觉稿宽度即可，另外如果文字不想使用rem的话，需要对gulp-rem的 “unit”参数进行配置。 

* 关于文字使用px： 如设计稿中文字大小是24px, 则进行如下书写即可，gulp-rem插件会自动转换成各dpr下大小设置
* ，这样则可以保证不同机型字体大小看起来一致：

```
.yuan {
    font-size: 24px;
}

//转换为下面
.yuan {
    font-size: 12px;
}

[data-dpr="1.5"] .yuan {
    font-size: 18px
}

[data-dpr="2"] .yuan {
    font-size: 24px
}

[data-dpr="2.5"] .yuan {
    font-size: 30px
}

[data-dpr="2.75"] .yuan {
    font-size: 33px
}

[data-dpr="3"] .yuan {
    font-size: 36px
}

[data-dpr="3.25"] .yuan {
    font-size: 39px
}

[data-dpr="3.5"] .yuan {
    font-size: 42px
}

[data-dpr="3.75"] .yuan {
    font-size: 45px
}

[data-dpr="4"] .yuan {
    font-size: 48px
}


```