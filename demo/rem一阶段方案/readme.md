### 一阶段rem方案：

使用目前比较好的hotcss方案来实现移动端布局，布局使用rem，文字根据dpr使用不同的px大小

* 关于rem计算： 本demo中使用的是我自己写的gulp插件 “gulp-rem”来计算，只要在gulpfile配置文件里填写你的视觉稿宽度即可，另外如果文字不想使用rem的话，需要对gulp-rem的 “unit”参数进行配置。

* 关于文字使用px： 如设计稿中文字大小是24px, 则进行如下书写，这样则可以保证不同机型字体大小看起来一致：

```
	.yuan {
        font-size: 12px;
        [data-dpr="2"] &{
            font-size: 24px;   // iphone 5s 等dpr为2的设置
        }
        [data-dpr="3"] &{
            font-size: 36px;   // iphone 6p 等dpr为3的设置
        }
    }

```