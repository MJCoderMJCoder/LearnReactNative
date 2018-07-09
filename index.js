import {AppRegistry} from 'react-native';
import App from './App';
import HeadlessJS from './components/common/HeadlessJS';

/**
 * AppRegistry是JS运行所有React Native应用的入口。
 * 应用的根组件应当通过AppRegistry.registerComponent方法注册自己，然后原生系统才可以加载应用的代码包并且在启动完成之后通过调用AppRegistry.runApplication来真正运行应用。
 * 要“结束”一个应用并销毁视图的话，请调用AppRegistry.unmountApplicationComponentAtRootTag方法，参数为在runApplication中使用的标签名。它们必须严格匹配。
 * AppRegistry应当在require序列中尽可能早的被require到，以确保JS运行环境在其它模块之前被准备好。
 *
 * 注册应用(registerComponent)后才能正确渲染。
 * 注意：只把应用作为一个整体注册一次，而不是每个组件/模块都注册
 */
AppRegistry.registerComponent('LearnReactNative', () => App);

/**
 * Headless JS是一种使用js在后台执行任务的方法。它可以用来在后台同步数据、处理推送通知或是播放音乐等等。
 * 首先要通过AppRegistry来注册一个async函数，这个函数称之为“任务”。
 * 然后创建require对应的HeadlessJS.js文件。
 *
 * 可以在任务中处理任何事情（网络请求、定时器等等），但唯独不能涉及用户界面！
 * 在任务完成后（例如在promise中调用resolve），RN会进入一个“暂停”模式，直到有新任务需要执行或者是应用回到前台。
 */
// AppRegistry.registerHeadlessTask('HeadlessJS', () => require('HeadlessJS'));


/**
 * 当运行应用程序时，可以查看 console 控制台，有多少模块已经加载，有多少模块在等待。
 * 请注意，可以根据需要修改 Systrace 对象，以帮助调试有问题的引用。
 */
const modules = require.getModules();
const moduleIds = Object.keys(modules);
const loadedModuleNames = moduleIds
    .filter(moduleId => modules[moduleId].isInitialized)
    .map(moduleId => modules[moduleId].verboseName);
const waitingModuleNames = moduleIds
    .filter(moduleId => !modules[moduleId].isInitialized)
    .map(moduleId => modules[moduleId].verboseName);
// make sure that the modules you expect to be waiting are actually waiting
/*console.log(
    'loaded:',
    loadedModuleNames.length,
    'waiting:',
    waitingModuleNames.length
);*/
// grab this text blob, and put it in a file named packager/moduleNames.js
/*
console.log(`module.exports = ${JSON.stringify(loadedModuleNames.sort())};`);*/
