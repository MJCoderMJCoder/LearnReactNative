import React, {Component} from 'react';


/**
 * Headless JS是一种使用js在后台执行任务的方法。它可以用来在后台同步数据、处理推送通知或是播放音乐等等。
 * 首先要通过AppRegistry来注册一个async函数，这个函数称之为“任务”。
 * 然后创建require对应的HeadlessJS.js文件。
 *
 * 可以在任务中处理任何事情（网络请求、定时器等等），但唯独不能涉及用户界面！
 * 在任务完成后（例如在promise中调用resolve），RN会进入一个“暂停”模式，直到有新任务需要执行或者是应用回到前台。
 */
module.exports = async (taskData) => {
    // 要做的事情
    console.log("用js在后台执行任务" + taskData)
}