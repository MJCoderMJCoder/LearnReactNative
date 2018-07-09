import React, {Component} from "react";
import {Text} from "react-native";
// ... import some very expensive modules

// You may want to log at the file level to verify when this is happening
console.log('VeryExpensive component loaded');

/**
 * Inline Requires  内联引用：延迟模块或文件的加载，直到实际需要该文件
 * 即使没有使用unbundling(分拆)，内联引用也会使启动时间减少，因为 VeryExpensive.js中的代码只有在第一次 require 时才会执行。
 */
export default class VeryExpensive extends Component {
    // lots and lots of code
    render() {
        return <Text style={{
            fontWeight: "bold",
            color: "white",
        }}>Very Expensive Component</Text>;
    }
}