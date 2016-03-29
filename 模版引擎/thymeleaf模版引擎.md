##  Layout

```
// layout/mainPage.html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
</head>
<body>
      <div data-th-remove="tag" data-layout-fragment="main"></div>
</body>
</html>

//使用方法,details.html
<!DOCTYPE html>
<html data-layout-decorator="/layout/mainPage">
<head>
    <title>会员管理</title>
</head>
<body>
    <article data-layout-fragment="main">
            article这个标签会替换layout的div那个标签
    </article>
</body>
</html>
```
##  标题

```
// 比如layout中的title设置如下
<title data-layout-title-pattern="$DECORATOR_TITLE - $CONTENT_TITLE">沃德APP</title>

//具体页面的title如下
<title>哈哈哈哈</title>


//渲染到前端的内容如下
<title>沃德APP-哈哈哈哈</title>
```

##  链接
```
<link data-th-href="@{/_resources/css/bootstrap.css?v=1}" rel="stylesheet" />
<script data-th-src="@{/_resources/vendor/underscore/underscore-min.js}"></script>
```

## 取后端的对象

```
// 比如后端给了total对象
map.put("total", total);  //total:12

//前端通过下面的方法取
<div data-th-text="${total}"></div> 
<input type="hidden" data-th-value="${total}" />
```

## 循环

```
//例1:
<img th:each="img : ${post.imgs}" vd:src="${img.imgUrl}" />


//例2:
<div class="avatar" th:each="man,status : ${post.likedUsers}" th:if="${status.index &lt; 10}"><img data-th-src="${man.avatarUrl}" /></div>
```

## 判断
```
<div data-th-if="${post.show}"></div>

<div class="avatar" th:if="${#lists.size(post.likedUsers) >= 10}"><img th:src="@{/_resources/images/share/more.png}" /></div>

<div data-th-if="${param.error != null}"><div>

//switch
<div data-th-remove="tag" data-th-switch="${product.status.name()}">
     <div data-th-remove="tag" data-th-case="'ONSALE'">
        <a id="buy" class="button">立即购买</a>
    </div>
    <div data-th-case="*">
    </div>
</div>
```

## classAppend
```
<div data-th-each="refunItem : ${orderRefund.opDetails}" class="refundMsg clearfix" data-th-classappend="${refunItem.from == 2 ? 'refundMsg_1' : 'refundMsg_2'}">
</div>
```


## String方法
```
${#strings.isEmpty(name)}
${#strings.arrayIsEmpty(nameArr)}
${#strings.listIsEmpty(nameList)}
${#strings.setIsEmpty(nameSet)}

/*
 * Perform an 'isEmpty()' check on a string and return it if false, defaulting to
 * another specified string if true.
 * Also works with arrays, lists or sets
 */
${#strings.defaultString(text,default)}
${#strings.arrayDefaultString(textArr,default)}
${#strings.listDefaultString(textList,default)}
${#strings.setDefaultString(textSet,default)}

/*
 * Check whether a fragment is contained in a String
 * Also works with arrays, lists or sets
 */
${#strings.contains(name,'ez')}                     // also array*, list* and set*
${#strings.containsIgnoreCase(name,'ez')}           // also array*, list* and set*

/*
 * Check whether a String starts or ends with a fragment
 * Also works with arrays, lists or sets
 */
${#strings.startsWith(name,'Don')}                  // also array*, list* and set*
${#strings.endsWith(name,endingFragment)}           // also array*, list* and set*

/*
 * Substring-related operations
 * Also works with arrays, lists or sets
 */
${#strings.indexOf(name,frag)}                      // also array*, list* and set*
${#strings.substring(name,3,5)}                     // also array*, list* and set*
${#strings.substringAfter(name,prefix)}             // also array*, list* and set*
${#strings.substringBefore(name,suffix)}            // also array*, list* and set*
${#strings.replace(name,'las','ler')}               // also array*, list* and set*

/*
 * Append and prepend
 * Also works with arrays, lists or sets
 */
${#strings.prepend(str,prefix)}                     // also array*, list* and set*
${#strings.append(str,suffix)}                      // also array*, list* and set*

/*
 * Change case
 * Also works with arrays, lists or sets
 */
${#strings.toUpperCase(name)}                       // also array*, list* and set*
${#strings.toLowerCase(name)}                       // also array*, list* and set*

/*
 * Split and join
 */
${#strings.arrayJoin(namesArray,',')}
${#strings.listJoin(namesList,',')}
${#strings.setJoin(namesSet,',')}
${#strings.arraySplit(namesStr,',')}                // returns String[]
${#strings.listSplit(namesStr,',')}                 // returns List<String>
${#strings.setSplit(namesStr,',')}                  // returns Set<String>

/*
 * Trim
 * Also works with arrays, lists or sets
 */
${#strings.trim(str)}                               // also array*, list* and set*

/*
 * Compute length
 * Also works with arrays, lists or sets
 */
${#strings.length(str)}                             // also array*, list* and set*

/*
 * Abbreviate text making it have a maximum size of n. If text is bigger, it
 * will be clipped and finished in "..."
 * Also works with arrays, lists or sets
 */
${#strings.abbreviate(str,10)}                      // also array*, list* and set*

/*
 * Convert the first character to upper-case (and vice-versa)
 */
${#strings.capitalize(str)}                         // also array*, list* and set*
${#strings.unCapitalize(str)}                       // also array*, list* and set*

/*
 * Convert the first character of every word to upper-case
 */
${#strings.capitalizeWords(str)}                    // also array*, list* and set*
${#strings.capitalizeWords(str,delimiters)}         // also array*, list* and set*

/*
 * Escape the string
 */
${#strings.escapeXml(str)}                          // also array*, list* and set*
${#strings.escapeJava(str)}                         // also array*, list* and set*
${#strings.escapeJavaScript(str)}                   // also array*, list* and set*
${#strings.unescapeJava(str)}                       // also array*, list* and set*
${#strings.unescapeJavaScript(str)}                 // also array*, list* and set*

/*
 * Null-safe comparison and concatenation
 */
${#strings.equals(str)}
${#strings.equalsIgnoreCase(str)}
${#strings.concat(str)}
${#strings.concatReplaceNulls(str)}
```

## 注意点

* 标签必须闭合，单标签也必须以"/ >" 闭合

* ">","<","&"等符号不能直接用，必须使用html实体

* 如果要在页面里面写js代码，必须如下：

```
<script data-th-inline="text">
/*<![CDATA[*/
    var conf =  '[[${buyerId}]]';
/*]]>*/
</script>
```




