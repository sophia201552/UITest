var BaseSrc = require('../modal/baseScr.js');
var CasePool = require('../modal/casePool.js');
var CaseUI = require('../modal/caseModal.js');
var CONFIG = require('../config');
var LoginScr = require('../modal/beop/loginScr.js');
var tendencyChart = require('../modal/beop/tendencyChart.js');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

CasePool['zihai'] = new CaseUI('API测试', function (driver) {
    this.check('111');
    this.step('1、 打开beop。 显示BeOP网站。');
    driver.get(CONFIG.URL.BEOP);
    // driver.navigate().to(CONFIG.URL.BEOP);
    // 2、 输入用户名密码, 单击登录。 进入项目选择页面。
    // driver.get(CONFIG.URL.BEOP).then(function() {
    //     return driver.findElement({id: 'txtName'});
    // }).then(function funcA(q) {
    //     return q.sendKeys('will.wu@rnbtech.com.hk');
    // }) .then(function funcB() {
    //     return driver.findElement({id: 'btnLogin'});
    // }).then(function funC(btnG) {
    //     return btnG.click();
    // });
    // driver.get(CONFIG.URL.BEOP);
    // driver.findElement({id: 'txtName'}).sendKeys('will.wu@rnbtech.com.hk');
    // driver.findElement({id: 'btnLogin'}).click();

    new LoginScr(driver).login('will.wu@rnbtech.com.hk', 'Wq876215');
    driver.sleep(3000);
    // driver.manage().window().maximize();
    // driver.manage().window().getSize().then(function(val){
    //     console.log(val)
    // });
    //4、 单击右上角用户头像。 弹出用户菜单。f
    // driver.findElement(By.id("iconList")).click();   
    // //5、 单击数据分析。 进入数据分析页面。
    // driver.findElement(By.id("btnDataAnalys")).click();
    // driver.sleep(5000);
    // driver.navigate().back();
    // driver.sleep(5000);
    // driver.navigate().forward();
    // driver.sleep(5000);
    // driver.navigate().refresh();
    // driver.executeScript(function(){
    ;

    // var start = new Date().getTime();
    // driver.executeAsyncScript('window.setTimeout(arguments[arguments.length - 1], 500);','console.log(new Date().getTime() - start)').then(function(e) {
    //    console.log(
    //        'Elapsed time: ' + (new Date().getTime() - start) + ' ms');
    // });

    // driver.manage().getCookies().then(function(cookies){
    //     var a = cookies[0]
    // })

    // driver.executeAsyncScript(function(){
    //     x + 2
    // }).then(function() {
    //     console.log('everything is great');
    // });

    // driver.executeAsyncScript(function(){
    //     x + 2
    // }).catch(function(error) {
    //     console.log('oh no'+error);
    // }).then(function() {
    //     console.log('carry on');
    // });
    // driver.executeAsyncScript(function(){
    //   // 下面一行会报错，因为x没有声明      
    //    x + 2
    // }).then(function() {
    //     return driver.findElement(By.id("iconList"));
    // }).catch(function(error) {
    //     console.log('oh no');
    // // 下面一行会报错，因为y没有声明
    //     y + 2;
    // }).then(function() {
    //     console.log('carry on');
    // },function(error){
    //     console.log("hsgfbfh")
    // });
    driver.executeAsyncScript(function () {
        // 下面一行会报错，因为x没有声明      
        x + 2
    }).then(function () {
        return driver.findElement(By.id("iconList"))
    }).catch(function (error) {
        console.log('oh no:');
        // 下面一行会报错，因为y没有声明
        y + 2;
    }).catch(function (error) {
        console.log('carry on:');
    });

});




// angular 的组件颗粒化到什么程度, 各个浏览器的兼容性如何解决, es6的赋值, angular页面几秒钟没有打开怎么优化

// // 引入组件
// var http = require("http");

// // 建立服务
// var app = http.createServer(function(request, response) {
//   response.writeHead(200, {
//     "Content-Type": "text/plain"
//   });
//   response.end("Hello world!\n");
// });

// // 启动服务
// app.listen(1337, "localhost");
// console.log("Server running at http://localhost:1337/");
// 现在你运行这个程序，如果这个文件的名字叫做app.js，你可以使用node app.js命令执行，你就会得到一个"Hello, world!"的response。浏览器中打开localhost:1337/anime_currency或者localhost:1337/?onlyfriend=anime得到的反馈就像我们在和一堵墙说话一样，答案只有一个——“Hello world!”。

// 我们再深入看下。

// 第一行使用了require命令载入了一个内建的模块——“http”。然后将其赋值为变量http。想要知道更多关于require的内容，看Nodejitsu's docs。

// 之后我们使用新的变量app将其赋值为http.createServer，这样函数就能接收request。这里我们会多花时间解释，因为这点是非常极其的重要。

// 最后，我们使用1337端口来监听requests。

// 现在，我们继续回到那个重要request handler函数。

// The request handler

// 在开始这节之前，我要说有很多很不错的HTTP方法对于学习Express不是有很大的关系。如果你想要了解更多，你可以看HTTP模块文档来学习更多。

// 当我们发出了一个到server的request，这个request handle函数就会被执行。如果你不相信我，你可以使用console.log命令来查看。你就会看到记录会随着每次载入页面而显示。

// request是来自客户端的request。在很多程序中，你看到这个单词简写成req。我们来看看代码，现在我们将上面的例子调整为：

// var app = http.createServer(function(request, response) {

//   // 处理生成答案
//   var answer = "";
//   answer += "Request URL: " + request.url + "\n";
//   answer += "Request type: " + request.method + "\n";
//   answer += "Request headers: " + JSON.stringify(request.headers) + "\n";

//   // 将答案发送出去
//   response.writeHead(200, { "Content-Type": "text/plain" });
//   response.end(answer);

// });
// 重新启动服务，打开localhost:1337。你会看到显示的request的内容：首先是GET类型的request，之后的header是包含了类似user-agent和一些其他的HTTP内容，如果把链接改成localhost:1337/what_is_anime,就会发现request的URL内容也随之改变了。如果你改变了浏览器，user-agent也会改变。如果你使用了POST发送request，发送方法也会改变。

// response是接下来要讲的部分。就像上面的单词经常被缩写一样，他也会被缩写成res。计算好要发送给客户的response，之后不要忘记使用response.end。这个连Node文档也提到。你可以试试不使用这个方法，这样服务器就会永远停留在半路。

// 在发送之前，你要写好文件头。在例子中，我们是这样写的：

// response.writeHead(200, { "Content-Type": "text/plain" });
// 这段代码做了两件事情，首先发送HTTP状态码为200，这个状态码的意思就是一切正常。之后就是设置response headers。这里我们设置了Content-Type为plaintext。我们也可以设置成JSON或者HTML。

// 想要学到更多的内容

// 想要知道更多，这是一个好事情。

// 一个可以更大发挥API的功效的方法可以看一下的代码：

// var http = require("http");

// http.createServer(function(req, res) {

//   // 主页
//   if (req.url == "/") {
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.end("Welcome to the homepage!");
//   }

//   // About页面
//   else if (req.url == "/about") {
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.end("Welcome to the about page!");
//   }

//   // 404'd!
//   else {
//     res.writeHead(404, { "Content-Type": "text/plain" });
//     res.end("404 error! File not found.");
//   }

// }).listen(1337, "localhost");
// 就像上面的代码一样，你可以改写你的更好的，或者你可以写出像Express一样的框架。

// 中间件，中间层

// JavaScript蛋糕中的中间层我们把它也叫作"中间件"。先不用查什么叫中间件，我这就开始解释。

// 一些Express代码

// 我们现在用Express来重写上面的“hello world”程序。不要忘记安装Express。

// // 引入组件
// var express = require("express");
// var http = require("http");

// // 生成实例
// var app = express();

// // 添加中间件
// app.use(function(request, response) {
//   response.writeHead(200, { "Content-Type": "text/plain" });
//   response.end("Hello world!\n");
// });

// // 开动起来
// http.createServer(app).listen(1337);
// 我们来一步一步的看。

// 首先，我们引入了Express，就像引入HTTP一样。

// 之后我们新建一个叫app的变量，这个变量的值是express()。这是什么意思？

// 之后我们添加了一个中间件，这是一个函数app.use。这个函数就像是一个糟糕的request handlers。

// 之后新建了一个服务端以及监听端，所以证明了什么，app只是一个函数。这是一个Express制作的所有中间件使用的函数。就像是前面提到的request handler那样。

// 你可能会纳闷以前使用app.listen(1337)，现在直接使用http.createServer。这只是一个缩写方法。

// 接下来我们还是继续解释中间件。

// 什么是中间件

// 关于中间件，我得承认Stephen Sugden解释的比我更好。不要担心文章中的“Connect”，把“Connect”换成“Express”就行。如果你不太喜欢我的解释，请拜读他的。

// 还记得前面提到的request handelers吗？这里每一个中间件都是一个request handler。从第一个request handler开始，到下一个，再到下一个。

// 这是一个基本的中间件的例子：

// function myFunMiddleware(request, response, next) {
//    // 这里使用response和request处理程序
//    // 当处理完毕之后，使用next()传递到下一个中间件
//    next();
// }
// 当启动服务的时候，执行的顺序是从上到下。所以如果想要添加一个简单的记录功能到程序中，就会很简单。

// var express = require("express");
// var http = require("http");
// var app = express();

// // 记录的中间件
// app.use(function(request, response, next) {
//   console.log("In comes a " + request.method + " to " + request.url);
//   next();
// });

// // 发送“Hello World”
// app.use(function(request, response) {
//   response.writeHead(200, { "Content-Type": "text/plain" });
//   response.end("Hello world!\n");
// });

// http.createServer(app).listen(1337);
// 打开localhost:1337链接的时候，我们就能在console中看到程序记录的一些东西。

// 如果能在普通的Node服务器运行，那么就能也在中间件运行。例如，如果你想要检查req.method， 直接使用就行了。

// 当你能写一个程序的时候，就会知道将会有大量的中间件。现在让我们去除记录程序，使用Morgan，这是一个Express的记录组件。使用npm install morgan安装。

// var express = require("express");
// var logger = require("morgan");
// var http = require("http");
// var app = express();

// app.use(logger());
// // logger()返回了一个函数

// app.use(function(request, response) {
//   response.writeHead(200, { "Content-Type": "text/plain" });
//   response.end("Hello world!\n");
// });

// http.createServer(app).listen(1337);
// 打开浏览器输入网址localhost:1337就能看到记录的信息。

// 想要学习更多

// 想象一个程序是使用了大量的中间件串联起来，就像下面这样：

// var express = require("express");
// var logger = require("morgan");
// var http = require("http");
// var app = express();

// app.use(logger());

// // 主页
// app.use(function(request, response, next) {
//   if (request.url == "/") {
//     response.writeHead(200, { "Content-Type": "text/plain" });
//     response.end("Welcome to the homepage!\n");
//     // 中间件在这里停止.
//   } else {
//     next();
//   }
// });

// // About 页面
// app.use(function(request, response, next) {
//   if (request.url == "/about") {
//     response.writeHead(200, { "Content-Type": "text/plain" });
//     response.end("Welcome to the about page!\n");
//     // 中间件在这里停止.
//   } else {
//     next();
//   }
// });

// // 404'd!
// app.use(function(request, response) {
//   response.writeHead(404, { "Content-Type": "text/plain" });
//   response.end("404 error!\n");
// });

// http.createServer(app).listen(1337);
// 代码看起来有点丑，但是Express的制作者们是聪明的，他们知道该怎么做。

// 顶层：路由

// 终于到达第三个阶段，我们也攀登到了山的高峰。

// 路由就像是request到每个特定的handlers的地图。在前面的例子中，我们有主页，about页面和404页面。我们使用了大量的if语句来处理不同的情况。

// 但是Express能做的不仅仅与此。我们可以使用“routing”来更好的组织代码：

// var express = require("express");
// var http = require("http");
// var app = express();

// app.all("*", function(request, response, next) {
//   response.writeHead(200, { "Content-Type": "text/plain" });
//   next();
// });

// app.get("/", function(request, response) {
//   response.end("Welcome to the homepage!");
// });

// app.get("/about", function(request, response) {
//   response.end("Welcome to the about page!");
// });

// app.get("*", function(request, response) {
//   response.end("404!");
// });

// http.createServer(app).listen(1337);
// 在完成基本的引入之后，我们使用app.all告诉每一个request都要使用其中的函数，这个函数和那个糟糕的中间件挺像的，是吧？

// 3个app.get就是Express的路由系统。也可以是app.post，或者是PUT等等HTTP动作。其中的第一个参数是一个路径。就像/about或者/。第二个参数是我们之前见过的request handle。引用Express的文档所说：

// [These request handlers] behave just like middleware, with the one exception that these callbacks may invoke next('route') to bypass the remaining route callback(s). This mechanism can be used to perform pre-conditions on a route then pass control to subsequent routes when there is no reason to proceed with the route matched.

// [request handlers]的行为就像中间件一样，唯一的区别就是其中的回调函数可以绕过其余路由件来调用下一个路由件。这种机制可以用来使路由件的执行在完成先决条件的时候，如果没有匹配的路由就可以传递到随后的路由。
// 一句话，基本上和我们见过的中间件一样。就是一个函数。

// 这个路由件可以更智能，就像下面的一样：

// app.get("/hello/:who", function(req, res) {
//   res.end("Hello, " + req.params.who + ".");
//   // Fun fact: this has security issues
// });
// 重启服务输入localhost:1337/hello/animelover69，就会显示如下：

// Hello, animelover69
// 文档中也有相应的例子，你可以使用路由做更多的事情。对于理解路由，我认为现在也基本差不多了。

// Express一些有用的东西

// 路由件已经够用了，但是Express一定不会罢休的。

// Request handling

// Express在每次使用了request handle都调用了request和response。这里有些旧的内容，也添加了新的内容。API文档解释了所有的事情，我们看几个例子。

// 一个好的方法就是redirect方法。这是一个例子：

// response.redirect("/hello/anime");
// response.redirect("http://www.myanimelist.net");
// 这不是普通的Node，Express添加了这个方法。还有添加了一个sendfile可以让你发送整个文件：

// response.sendFile("/path/to/anime.mp4");
// request也有大量的有用的属性，就像request.ip可以获得IP地址，request.files可以上传文件。

// 这里也不需要了解的很多，你只要使用好request和response，所有内容可以查看API文档。

// Views

// 想要知道更多的内容？

// Express可以操作views。这不是个坏的事情，以下是一个例子：

// // 开始Express
// var express = require("express");
// var app = express();

// // 将视图文件夹设置为 /views
// app.set("views", __dirname + "/views");

// // 使用pug模板引擎
// app.set("view engine", "pug");
// 第一段代码和往常一样，是引入模块。之后我们将视图文件夹设置路径，之后我们使用Pug作为模板引擎。我们很快就能知道这个是干什么的。

// 现在我们已经设置好了，我们怎么使用呢？

// 我们新建一个文件叫index.pug。将这个文件放在views文件夹中。这个文件的内容如下：

// doctype 5
// html
//   body
//     h1 Hello, world!
//     p= message
// 这个基本上就是没有括号的HTML。如果你对HTML熟悉的话，你应该能够看懂。只是最后一个message是一个变量！这是怎么回事？我来告诉你。

// 我们需要从Express渲染视图，这是Express中的代码：

// app.get("/", function(request, response) {
//   response.render("index", { message: "I love anime" });
// });
// Express添加了方法到response，叫做render。这可以做很多事情，现在基本上就是渲染视图文件夹的视图引擎渲染index.pug文件。

// 最后一步（或者是第一步）是安装Pug，这没有随着Express安装。使用npm install完成安装。

// 如果你完成了所有的内容，这里有一个所有代码的文件，你可以对照。

// 做点实在的

// 前面的大部分事情都是虚的，我们来点实际的。

// 你可以使用终端安装Experss生成器，它可以生成一个app需要的样板。使用npm全局安装。

// //可能你需要使用sudo来安装
// npm install -g express-generator
// 如果需要帮助，你可以使用express --help。它会给出相应的选项。举例如下：如果我想使用EJS模板引擎，LESS作为CSS预处理，我的程序叫做“myApp”。这就是我要输入的代码：

// express --ejs --css less myApp
// 这回生成一些文件，之后进入这个文件夹，输入命令npm install。如果你完成，你就可以使用node app运行这个基本的程序。我建议你看看这些生成的文件夹的结构形式，基本上就是一个程序所需要的所有文件，这对刚起步的时候建立文件结构很有帮助。

// 这里有很多的例子可以看。

// 小小的总结

// 如果你喜欢CoffeeScript，你应该知道这里所有的内容都被支持，你甚至都不用编译。只要使用coffee app.coffee代替node app.js。就是这么简单。
// Express一般都需要使用Connect，就像Express一样，这也是一个中间层。Connect中间件和Express中间件一起兼容。
// 想要了解更多的内容

// 以上内容的学习还不满足你？你真是“贪得无厌”。

// 我要无耻的推荐我的这本书-Express.js in Action。希望这篇教程能够帮助你了解Express，书里将会更深入的学习更多的内容。

// 我就准备讲到这里了。很多人已经使用Express做了很好的程序。The Express wiki lists them就能看到他们的成果。你也可以使用他们的框架，或者你可以挖掘更深层次的内容。不管怎么样，你都会做出一番成果的。

// 作者：lvsjack1
// 链接：http://www.jianshu.com/p/8168a18cb02a
// 來源：简书
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。