/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TextInput,
    ScrollView,
    FlatList,
    SectionList,
    ImageBackground,
    TouchableHighlight,
    TouchableOpacity,
    TouchableNativeFeedback,
    Button,
    Animated,
    UIManager,
    LayoutAnimation,
    Easing,
    InteractionManager,
    YellowBox,
    PureComponent,
    AccessibilityInfo,
    ActivityIndicator,
    Alert,
    CheckBox,
    KeyboardAvoidingView,
    Modal,
    Picker,
    Slider,
    StatusBar,
    Switch,
    WebView,
    AlertButton,
    PanResponder,
    AppState,
    BackHandler,
    Linking,
    NetInfo,
    Share,
    Vibration,
    Platform
} from 'react-native';

/* const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
}); */
/* type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
} */

/* const styles = StyleSheet.create({
          container: {
          flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
  welcome: {
          fontSize: 20,
        textAlign: 'center',
        margin: 10,
      },
  instructions: {
          textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
      },
    }); */

/**===========================================
 * // 假设App就是项目中的入口文件，如果还不知道，可以看下Demo，在这里我将主题色通过screenProps属性修改成'red
 * <App screenProps={{themeColor: 'red'}}>
 *
 const App = StackNavigator({
    Main: {sreen: MainScreen},
    Profile: {sreen: ProfileScreen},
});
 class MainScreen extends Component {
    static navigationOptions = {title: "welcome",};

    render() {
        const {navigate} = this.props.navigation;
        return (
            <Button title="Go to Jane's profile" onPress={() => navigate("Profile", {name: "jane"})}/>
        );
    };
}
 class ProfileScreen extends Component {
    render() {
        return (
            <Text>没意思Profile</Text>
        );
    };
}
 */
let VeryExpensive = null;

/**
 * Animated旨在以声明的形式来定义动画的输入与输出，在其中建立一个可配置的变化函数，然后使用简单的start/stop方法来控制动画按顺序执行。
 * Animated的接口一般会在JavaScript线程中计算出所需要的每一个关键帧，而LayoutAnimation则利用了Core Animation，使动画不会被JS线程和主线程的掉帧所影响。
 * 注意：LayoutAnimation只工作在“一次性”的动画上（"静态"动画） -- 如果动画可能会被中途取消，你还是需要使用Animated。
 * 淡入动画效果
 */
class FadeInView extends Component {
    constructor() {
        super();
        this.state = {
            /**
             * Animated.Value()用于驱动动画的标准值。
             * 一个Animated.Value可以用一种同步的方式驱动多个属性，但同时只能被一个行为所驱动。启用一个新的行为（譬如开始一个新的动画，或者运行setValue）会停止任何之前的动作。
             * setValue(value: number)：直接设置它的值。这个会停止任何正在进行的动画，然后更新所有绑定的属性。
             * setOffset(offset: number)：设置一个相对值，不论接下来的值是由setValue、一个动画，还是Animated.event产生的，都会加上这个值。常用来在拖动操作一开始的时候用来记录一个修正值（譬如当前手指位置和View位置）。
             * flattenOffset()：把当前的相对值合并到值里，并且将相对值设为0。最终输出的值不会变化。常在拖动操作结束后调用。
             * addListener(callback: ValueListenerCallback)：添加一个异步监听函数，这样就可以监听动画值的变更。
             * stopAnimation(callback?: ?(value: number) => void)：停止任何正在运行的动画或跟踪值。callback会被调用，参数是动画结束后的最终值，这个值可能会用于同步更新状态与动画位置。
             *
             *  Animated.ValueXY(0,0): 用来驱动2D动画的2D值，譬如滑动操作等。API和普通的Animated.Value几乎一样，只不过是个复合结构。它实际上包含两个普通的Animated.Value。
             */
            fadeAnim: new Animated.Value(0), //透明度初始值设为0
        }
    }

    /**
     * componentWillMount()：只会在装载之前调用一次，在 render之前调用；可以在这个方法里面调用setState改变状态，并且不会导致额外调用一次 render。官方建议用 constructor 代替
     *
     *在第一次渲染后调用，只在客户端。
     * 之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。
     * 可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等操作(防止异部操作阻塞UI)。
     * componentDidMount()：只会在装载完成之后调用一次，在 render之后调用，从这里开始可以通过ReactDOM.findDOMNode(this)获取到组件的 DOM 节点。
     */
    componentDidMount() {
        /**
         * Animated.decay()以指定的初始速度开始变化，然后变化速度越来越慢直至停下。
         * 【Config参数有以下这些属性：velocity: 初始速度、必填。deceleration: 衰减系数、默认值0.997。 useNativeDriver: 使用原生动画驱动、默认不启用(false)。】
         * Animated.spring()提供一个简单的弹簧物理模型、产生一个基于Rebound和Origami实现的Spring动画。
         * 【Config参数有以下这些属性（注意不能同时定义bounciness/speed和 tension/friction这两组，只能指定其中一组）：
         *          friction: Controls "bounciness"/overshoot. Default 7.
         *          tension: Controls speed. Default 40.
         *          speed: Controls speed of the animation. Default 12.
         *          bounciness: Controls bounciness. Default 8.
         *          useNativeDriver: 使用原生动画驱动。默认不启用(false)。】
         * Animated.timing()使用easing函数让数据随时间动起来：大多数情况下应该使用timing()。默认情况下，它使用对称的 easeInOut 曲线，将对象逐渐加速到全速，然后通过逐渐减速停止结束。
         * 【Config参数有以下这些属性：duration: 动画的持续时间（毫秒）、默认值为500。easing: Easing function to define curve、默认值为Easing.inOut(Easing.ease)。
         *          delay: 开始动画前的延迟时间（毫秒）、默认为0。useNativeDriver: 使用原生动画驱动、默认不启用(false)。】
         *
         * 随时间变化而执行的动画类型。
         */
        Animated.timing(
            this.state.fadeAnim,  // 动画中的变量值
            {
                toValue: 1, // 透明度最终变为1，即完全不透明
                easing: Easing.circle, //指定一个不同的缓动函数
                duration: 5000, //自定义持续时间
                delay: 1000, //动画开始之前的延迟
                /**
                 * 使用原生动画驱动：在启动动画前就把其所有配置信息都发送到原生端，利用原生代码在UI线程执行动画。
                 * 如此一来，动画一开始就完全脱离了JS线程，因此即便JS线程被卡住，也不会影响到动画。
                 * 动画值在不同的驱动方式之间是不能兼容的。因此如果在某个动画中启用了原生驱动，那么所有和此动画依赖相同动画值的其他动画也必须启用原生驱动。
                 */
                useNativeDriver: true, //使用原生动画驱动
            }
        ).start((finished) => {
            /**
             * start()有一个完成回调函数，当动画完成时将会调用它。
             * 如果动画运行正常，则将通过{finished：true}触发回调。如果动画是因为调用了stop()而结束，则它会收到{finished：false}。
             */
            console.log("finished：" + finished.finished);
        }); //开始执行动画
    }

    render() {
        return (
            /**
             * 组件必须经过特殊处理才能用于动画。
             * 所谓的特殊处理主要是指把动画值绑定到属性上，并且在一帧帧执行动画时避免react重新渲染和重新调和的开销。
             * 此外还得在组件卸载时做一些清理工作，使得这些组件在使用时是安全的。
             * createAnimatedComponent()方法正是用来处理组件，使其可以用于动画。
             *
             *Animated仅封装了四个可以动画化的组件：View、Text、Image和ScrollView;
             * 也可以使用Animated.createAnimatedComponent()来封装自己的组件。
             */
            <Animated.View
                style={{
                    ...this.props.style,
                    opacity: this.state.fadeAnim  //将透明度指定为动画变量值
                }}>
                {this.props.children}
            </Animated.View>
        );
    }
}

/**
 * class AnimatedValueXY
 * 用来驱动2D动画的2D值，譬如滑动操作等。API和普通的Animated.Value几乎一样，只不过是个复合结构。它实际上包含两个普通的Animated.Value。
 */
class DraggableView extends React.Component {
    constructor() {
        super();
        this.state = {
            pan: new Animated.ValueXY(), // inits to zero
        };
        this.state.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([null, {
                dx: this.state.pan.x, // x,y are Animated.Value
                dy: this.state.pan.y,
            }]),
            onPanResponderRelease: () => {
                Animated.spring(
                    this.state.pan,         // Auto-multiplexed
                    {toValue: {x: 50, y: 50}} // Back to zero
                ).start();
            },
        });
    }

    render() {
        return (
            /**
             * getLayout()：
             * 将一个{x, y}组合转换为{left, top}以用于样式。例如：
             * style={this.state.anim.getLayout()}
             *
             * getTranslateTransform()：
             * 将一个{x, y} 组合转换为一个可用的位移变换(translation transform)，例如：
             * style={{transform: this.state.anim.getTranslateTransform()}}
             */
            <Animated.View
                {...this.state.panResponder.panHandlers}
                style={{flex: 1, width: 200, backgroundColor: "white"}}>
                {this.props.children}
            </Animated.View>
        );
    }
}

/**
 * 动画还可以使用组合函数以复杂的方式进行组合：
 * Animated.delay() 在给定延迟后开始动画。
 * Animated.parallel() 同时开始一个动画数组里的全部动画。默认情况下，如果有任何一个动画停止了，其余的也会被停止。可以通过stopTogether选项来改变这个效果。
 * Animated.sequence() 按顺序执行一个动画数组里的动画，等待一个完成后再执行下一个。如果当前的动画被中止，后面的动画则不会继续执行。
 * Animated.stagger() 按照给定的延时间隔，顺序并行的启动动画。【一个动画数组，里面的动画有可能会同时执行（重叠），不过会以指定的延迟来开始。用来制作拖尾效果非常合适。】
 * 动画也可以通过将toValue设置为另一个动画的Animated.Value来简单的链接在一起。
 * 默认情况下，如果一个动画停止或中断，则组中的所有其他动画也会停止。
 *
 * 合成动画值
 * 也可以使用加乘除以及取余等运算来把两个动画值合成为一个新的动画值。Animated.add()、Animated.multiply()、Animated.divide()、Animated.modulo()
 *
 * 多个动画可以通过parallel（同时执行）、sequence（顺序执行）、stagger和delay来组合使用。它们中的每一个都接受一个要执行的动画数组，并且自动在适当的时候调用start/stop。
 * 组合动画效果【有问题，不知该如何正确应用】
 */
class CombinationAnimation extends Component {
    constructor() {
        super();
        this.state = {
            animatedValue: 0,
        }
    }

    /**
     * componentWillMount()：只会在装载之前调用一次，在 render之前调用；可以在这个方法里面调用setState改变状态，并且不会导致额外调用一次 render。官方建议用 constructor 代替
     *
     *在第一次渲染后调用，只在客户端。
     * 之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。
     * 可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等操作(防止异部操作阻塞UI)。
     * componentDidMount()：只会在装载完成之后调用一次，在 render之后调用，从这里开始可以通过ReactDOM.findDOMNode(this)获取到组件的 DOM 节点。
     */
    componentDidMount() {
        Animated.sequence([            // 首先执行decay动画，结束后执行parallel动画（parallel动画中将同时执行spring和twirl动画）
            Animated.decay(this.state.animatedValue, {   // 滑行一段距离后停止
                // velocity: {x: gestureState.vx, y: gestureState.vy}, // 根据用户的手势设置速度
                deceleration: 0.997,
            }),
            Animated.parallel([          // 在decay之后并行执行：
                Animated.spring(this.state.animatedValue, {
                    toValue: {x: 0, y: 0}    // 返回到起始点开始
                }),
                Animated.timing(0, {   // 同时开始旋转
                    toValue: 360,
                }),
            ]),
        ]).start();                    // 执行这一整套动画序列
        /**
         *Animated.loop()
         * 连续循环给定动画，以便每次到达结尾时，它会重置并从头开始。 可以使用配置中的键'iterations【迭代次数】'指定循环的次数。 如果子动画设置为'useNativeDriver'，将循环而不阻止UI线程。
         */
    }

    render() {
        return (
            /**
             *Animated.event()允许手势或其它事件直接绑定到动态值上
             *
             onScroll={Animated.event(
                                //scrollX被映射到了event.nativeEvent.contentOffset.x(event通常是回调函数的第一个参数)
                                [{nativeEvent: {contentOffset: {y: scrollY}}}]   // scrollX = e.nativeEvent.contentOffset.x
                            )}
             onPanResponderMove={Animated.event([
                                null,                                          // 忽略原生事件
                                //pan.x和pan.y分别映射到gestureState.dx和gestureState.dy（gestureState是传递给PanResponder回调函数的第二个参数）。
                                {dx: pan.x, dy: pan.y}                         // 从gestureState中解析出dx和dy的值
                            ])}
             */
            <Animated.ScrollView // <-- 使用Animated ScrollView wrapper
                scrollEventThrottle={1} // <-- 设为1以确保滚动事件的触发频率足够密集
                onScroll={this.Animated.event(
                    [{nativeEvent: {contentOffset: {x: this.state.animatedValue}}}],
                    {useNativeDriver: true} // <-- 加上这一行
                )}
            >
                {this.props.content}
            </Animated.ScrollView>
        );
    }
}

/**
 * 问候组件
 *
 * 组件结构：唯一必须的就是 在render方法中返回一些用于渲染结构的JSX语句。
 */
class GreetingBlink extends Component {
    /**
     * 一般来说，需要在constructor中初始化state，然后在需要修改时调用setState方法。
     * （译注：这是ES6的写法，早期的很多ES5的例子使用的是getInitialState方法来初始化state，这一做法会逐渐被淘汰）
     */
    constructor() {
        super();
        this.state = {showText: true};
        /**
         * Interval-间隔：100ms;
         *
         * lambda 表达式的语法格式如下：(parameters) => expression  或  (parameters) ->{ statements; }
         * lambda 表达式可视为一个匿名函数：前面的是参数，后面的是函数体。
         *
         * 把一个定时器的引用挂在this上
         */
        this.timer = setInterval(() => {
            this.setState(
                previousState => {
                    return {showText: !previousState.showText};
                }
            );
        }, 100);
    };

    render() {
        // 根据当前showText的值决定是否显示text内容
        let display = this.state.showText ? ("你好，" + this.props.username + "！") : "";
        return (
            // 内置的<Text>组件，它专门用来显示文本
            <Text style={[this.props.style, {
                textDecorationLine: "underline line-through",
                includeFontPadding: false,
            }]}>{display}</Text>
        );
    };

    /**
     * 务必在卸载组件前清除定时器！
     * 在unmount组件时清除（clearTimeout/clearInterval）所有用到的定时器
     *
     * 在组件从 DOM 中移除(卸载)的时候立刻被调用。
     */
    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }
}

/**
 * TextInput是一个允许用户输入文本的基础组件。
 * 它有一个名为onChangeText的属性，此属性接受一个函数，而此函数会在文本变化时被调用。
 * 另外还有一个名为onSubmitEditing的属性，会在文本被提交后（用户按下软键盘上的提交键）调用。
 */
class TextInputTranslator extends Component {
    constructor() {
        super();
        this.state = {text: ""};
    }

    render() {
        return (
            <View style={this.props.style}>
                <TextInput placeholder="再次输入将要翻译的字符" onChangeText={(text) => this.setState({text})}
                           style={{flex: 1, textAlign: "center"}} autoFocus={false} editable={true}
                           keyboardType={"default"} maxLength={10} returnKeyType={"done"}
                           secureTextEntry={true}/>
                <Text style={{flex: 1, textAlign: "center"}}>
                    {
                        // word&&'@'：是当word不为""将其替换为@； word||'@'：当word为""将其替换为@。  【word&"@"和word|"@"时都返回0】
                        this.state.text.split(" ").map((word) => word && "@").join(" | ") + "\n" + this.state.text
                    }
                </Text>
            </View>
        );
    }
};


/**
 * FlatList组件用于显示一个垂直的滚动列表，其中的元素之间结构近似而仅数据不同。
 * FlatList更适于长列表数据，且元素个数可以增删。
 * FlatList组件必须的两个属性是data和renderItem。data是列表的数据源，而renderItem则从数据源中逐个解析数据，然后返回一个设定好格式的组件来渲染。
 */
class FlatListBasics extends Component {
    constructor() {
        super();
        this.state = {
            flatListData: [
                {name: "devin"},
                {name: "Micheal"},
                {name: "Jaime"},
                {name: "佛兰德斯的狗"},
                {name: "茹拉夫"}
            ],
        }
    }

    componentDidMount() {
        this.getDataFromApiAsync();
    }

    render() {
        return (
            <View style={styles.scrollView}>
                <FlatList
                    data={this.state.flatListData}
                    renderItem={({item}) => <Text style={{color: "white"}}>{item.request_title}</Text>}
                    horizontal={false}
                />
            </View>
        );
    }


    /**
     * 从服务端获取数据
     * @returns {Promise<T>}
     */
    getDataFromApiAsync() {
        return fetch('https://dev.popmach.com/api/service/main/list_request_center')
            .then((response) => response.json())
            .then((responseJson) => { //这儿的responseJson是上一个then函数中处理成功后的JSON（及上一个then函数返回的new Promise(function (resolve, reject) {});里的resolve内部值）
                    this.setState({flatListData: responseJson.data});
                }
            )
            .catch((error) => {
                console.error(error);
            });
    }
}

/**
 * SectionList可以渲染一组需要分组的数据，也许还带有分组标签。
 */
class SectionListBasics extends Component {
    render() {
        return (
            <View style={styles.scrollView}>
                <SectionList
                    sections={
                        [
                            {title: "=========D=========", data: [{name: "devin"}, {name: "dog"}, {name: "daier"}]},
                            {
                                title: "=========J=========",
                                data: [{name: "Jaime"}, {name: "Jack"}, {name: "JB"}, {name: "Java"}, {name: "JavaScript"}]
                            }
                        ]
                    }
                    renderItem={({item}) => <Text style={{color: "white"}}>{item.name}</Text>}
                    renderSectionHeader={({section}) => <Text style={styles.headText}>{section.title}</Text>}
                />
            </View>
        );
    }
}

/**
 * 自定义按钮
 */
class MyButton extends Component {
    render() {
        return (
            <View>
                <Text style={styles.test}>{this.props.label}</Text>
            </View>
        )
    }
}

/**
 * 组合构件
 */
class CombinationComponent extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.touchable} onPress={this.props.onPress}>
                <MyButton label={this.props.label}/>
            </TouchableOpacity>
        )
    }
}

/**
 * AccessibilityInfo
 * 查询屏幕阅读器的当前状态
 */
class ScreenReaderStatusExample extends React.Component {
    state = {
        screenReaderEnabled: false,
    }

    /**
     * componentWillMount()：只会在装载之前调用一次，在 render之前调用；可以在这个方法里面调用setState改变状态，并且不会导致额外调用一次 render。官方建议用 constructor 代替
     *
     *在第一次渲染后调用，只在客户端。
     * 之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。
     * 可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等操作(防止异部操作阻塞UI)。
     * componentDidMount()：只会在装载完成之后调用一次，在 render之后调用，从这里开始可以通过ReactDOM.findDOMNode(this)获取到组件的 DOM 节点。
     */
    componentDidMount() {
        /**
         * 添加事件监听器
         */
        AccessibilityInfo.addEventListener(
            'change',
            this._handleScreenReaderToggled
        );
        /**
         * 查询屏幕阅读器当前是否启用。返回解析为布尔值的promise。启用屏幕阅读器时结果为true，否则为false。
         */
        AccessibilityInfo.fetch().done((isEnabled) => {
            this.setState({
                screenReaderEnabled: isEnabled
            });
        });
    }

    /**
     * 在组件从 DOM 中移除的时候立刻被调用。
     */
    componentWillUnmount() {
        /**
         * 删除事件监听器。
         */
        AccessibilityInfo.removeEventListener(
            'change',
            this._handleScreenReaderToggled
        );
    }

    _handleScreenReaderToggled = (isEnabled) => {
        this.setState({
            screenReaderEnabled: isEnabled,
        });
    }

    render() {
        return (
            <View>
                <Text style={{color: "white"}}>
                    The screen reader is {this.state.screenReaderEnabled ? 'enabled' : 'disabled'}.
                </Text>
            </View>
        );
    }
}

let pattern, patternLiteral, patternDescription;
if (Platform.OS === 'android') {
    /**
     * 在Andriod上，数组第一个元素表示开始震动前的等待时间，然后是震动持续时长和等待时长的交替，
     * 例如[0, 500, 1000, 500]表示立刻开始震动500ms，然后等待1000ms，再震动500ms.
     */
    pattern = [0, 500, 200, 500];
    patternLiteral = '[0, 500, 200, 500]';
    patternDescription = `${patternLiteral}
arg 0: duration to wait before turning the vibrator on.
arg with odd: vibration length.
arg with even: duration to wait before next vibration.
`;
} else {
    /**
     * 在iOS上震动时长是固定的，所以从数组第二个元素开始都是表示震动的间隔时长。
     */
    pattern = [0, 1000, 2000, 3000];
    patternLiteral = '[0, 1000, 2000, 3000]';
    patternDescription = `${patternLiteral}
vibration length on iOS is fixed.
pattern controls durations BETWEEN each vibration only.

arg 0: duration to wait before turning the vibrator on.
subsequent args: duration to wait before next vibrattion.
`;
}
/**
 * 默认组件
 */
export default class HelloWorldApp extends Component {
    constructor() {
        super();
        this.state = {
            w: 100,
            h: 100,
            needsExpensive: false,
            isLoading: true,
            loadHeight: 50,
            language: "html",
            switchValue: false,
            currentAppState: AppState.currentState,
            shareResult: "等待分享中",
        }
    }

    handleAppStateChange = (nextAppState) => {
        if (this.state.currentAppState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!\t' + nextAppState)
        } else if (nextAppState === 'active') {
            console.log('App has come to the foreground!\t' + nextAppState)
        } else {
            console.log('App has come to the background!\t' + nextAppState)
        }
        this.setState({currentAppState: nextAppState});
    }

    /**
     * Animated的接口一般会在JavaScript线程中计算出所需要的每一个关键帧，而LayoutAnimation则利用了Core Animation，使动画不会被JS线程和主线程的掉帧所影响。
     * 注意：LayoutAnimation只工作在“一次性”的动画上（"静态"动画） -- 如果动画可能会被中途取消，你还是需要使用Animated。
     */
    touchableOpacityOnPress = () => {
        // Animate the update
        LayoutAnimation.spring();
        this.setState({w: this.state.w + 15, h: this.state.h + 15, isLoading: false, loadHeight: 0})
    }

    /**
     * Inline Requires  内联引用：延迟模块或文件的加载，直到实际需要该文件
     * 即使没有使用unbundling(分拆)，内联引用也会使启动时间减少，因为 VeryExpensive.js中的代码只有在第一次 require 时才会执行。
     */
    inlineRequires = () => {
        if (VeryExpensive == null) {
            VeryExpensive = require('./components/common/VeryExpensive.js').default;
        }
        this.setState((previousState) => ({
            needsExpensive: !previousState.needsExpensive,
        }));
    };

    /**
     * 分享消息、标题
     */
    shareText() {
        /**
         * share(content, options) ：打开一个对话框来共享文本内容。
         */
        Share
            .share(
                {
                    message: '使用响应式构建本机应用程序的框架。',
                    url: 'http://www.baidu.com',
                    title: 'React Native'
                },
                {
                    dialogTitle: 'Share React Native website',
                    excludedActivityTypes: ['com.apple.UIKit.activity.PostToTwitter'],
                    tintColor: 'green'
                })
            .then(this.showResult)
            .catch((error) => this.setState({shareResult: 'error: ' + error.message}));
    }

    /**
     * 分享后的结果【有问题等待解决、不太清楚】
     * @param result
     */
    showResult(result) {
        if (result.action === Share.sharedAction) { //内容已成功共享。
            if (result.activityType) {
                this.setState({shareResult: 'shared with an activityType: ' + result.activityType})
            } else {
                this.setState({shareResult: 'shared'});
            }
        } else if (result.action === Share.dismissedAction) { //该对话框已被拒绝
            this.setState({shareResult: 'dismissed'});
        }
    }


    render() {
        // console.error("哈哈哈哈，你报错了");  //手动触发红屏错误
        console.disableYellowBox = true;  //true：禁用黄屏警告；false：启用黄屏警告
        //也可以通过调用ignoreWarnings方法屏蔽指定的警告，参数为一个数组：数组中的字符串就是要屏蔽的警告的开头的内容。
        // YellowBox.ignoreWarnings(['Warning:']); //会屏蔽掉所有以Warning开头的警告内容
        // console.warn('YellowBox is enabled.');  //手动触发黄屏警告

        /**
         * let允许你声明一个作用域被限制在块级中的变量、语句或者表达式。
         * 在Function中局部变量推荐使用let变量，避免变量名冲突。
         * let不允许在相同作用域内，重复声明同一个变量。
         * let : 变量只能声明一次
         * var : 变量可以多次声明
         * var声明的变量的作用域是整个封闭函数。
         * */
        let pic = {
            uri: "http://p0.so.qhmsg.com/t0149a148268ee618bf.jpg"
        };
        //require语法也可以用来静态地加载项目中的声音、视频或者文档文件。包括.mp3, .wav, .mp4, .mov, .htm 和 .pdf等【视频必须指定尺寸而不能使用flex样式】
        var icon = this.props.active ? require('./image/yuner.jpg') : require('./image/jingtian.jpg');
        return (
            // View 常用作其他组件的容器，来帮助控制布局和样式。

            <View style={styles.container}>
                <ImageBackground
                    source={{uri: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530195224335&di=b8bd67422b7cd68320f1a961d0b0befa&imgtype=0&src=http%3A%2F%2Fpic-cdn.35pic.com%2F58pic%2F13%2F14%2F14%2F38Y58PICCx8_1024.jpg"}}
                    style={styles.container}>
                    {/* 内置的<Text>组件，它专门用来显示文本 */}
                    <Text style={styles.title} selectable={false}>Hello world, I am React Native.</Text>
                    {/* 括号的意思是括号内部为一个js变量或表达式，需要执行后取值。因此可以把任意合法的JavaScript表达式通过括号嵌入到JSX语句中。 */}
                    <View style={styles.imageView}>
                        <FadeInView style={{flex: 1}}>
                            <Image source={pic}
                                   style={[styles.image, {borderRadius: 10}]}
                                   resizeMode={"cover"}/>
                        </FadeInView>
                    </View>
                    <GreetingBlink style={[styles.title, styles.test]} username="梵洁诗"/>
                    {/* style也可以传入一个数组——在数组中位置居后的样式对象比居前的优先级更高，这样就可以间接实现样式的继承。 */}
                    <GreetingBlink style={[styles.test, styles.title]} username="乐俊凯"/>
                    <TextInputTranslator style={styles.inputTranslator}></TextInputTranslator>
                    <View style={[styles.scrollView, {flex: 8}]}>
                        {/* ScrollView是一个通用的可滚动的容器，可以在其中放入多个组件和视图，且这些组件并不需要是同类型的。ScrollView不仅可以垂直滚动，还能水平滚动（通过horizontal属性来设置）。 */}
                        {/* ScrollView适合用来显示数量不多的滚动元素。pagingEnabled属性控制是否整屏整屏的滑动*/}
                        <ScrollView horizontal={true} pagingEnabled={false}>
                            <WebView
                                style={{width: 300}}
                                automaticallyAdjustContentInsets={true}
                                source={{uri: "http://www.sogou.com"}}
                                mediaPlaybackRequiresUserAction={true}
                                onError={() => {
                                    console.log("加载失败时调用。")
                                }}
                                onLoad={() => {
                                    console.log("加载成功时调用。")
                                }}
                                onLoadEnd={() => {
                                    console.log("加载结束时（无论成功或失败）调用。")
                                }}
                                onLoadStart={() => {
                                    console.log("加载开始时调用。")
                                }}
                                onMessage={(data) => {
                                    console.log("window.postMessage：" + data)
                                }}
                                onNavigationStateChange={() => {
                                    console.log("导航状态变化。")
                                }}
                                renderError={(error) => {
                                    console.log("设置一个函数，返回一个视图用于显示错误。" + error)
                                }}
                                renderLoading={() => {
                                    console.log("设置一个函数，返回一个加载指示器。")
                                    return (
                                        <ActivityIndicator
                                            animating={this.state.isLoading}
                                            style={[styles.centering, {height: this.state.loadHeight}]}
                                            size="large"/>);
                                }}
                                scalesPageToFit={true}
                                startInLoadingState={true}
                            />
                            <Switch value={this.state.switchValue} onValueChange={() => {
                                this.setState((prevState) => ({
                                    switchValue: !prevState.switchValue,
                                }))
                            }}/>
                            <Slider maximumTrackTintColor={"white"} maximumValue={100} minimumValue={0}
                                    thumbImage={require("./image/yuner.jpg")} style={{width: 200}}/>
                            <Text>Scroll me </Text>
                            <Image style={{width: this.state.w, height: this.state.h}}
                                   source={{uri: 'http://p0.so.qhmsg.com/bdr/326__/t0179d7e549f15e2e75.jpg'}}/>
                            <Text> 与访问网络图片相比；Packager可以得知本地图片大小，不需要在代码里再声明一遍尺寸。 </Text>
                            <Image source={require('./image/yuner.jpg')}/>
                            <Text> require中的图片名字必须是一个静态字符串（不能使用变量！因为require是在编译时期执行，而非运行时期执行！）。 </Text>
                            <Image style={{width: 40, height: 60}} source={icon}/>
                            <Text> If you like </Text>
                            <Text> Scrolling down </Text>
                            <Text> What's the best </Text>
                            <Text> Framework around? </Text>
                            <Text> React Native </Text>
                        </ScrollView>
                    </View>
                    <FlatListBasics></FlatListBasics>
                    <SectionListBasics></SectionListBasics>
                    <Button
                        style={styles.image}
                        title={"点击按钮"}
                        onPress={this.inlineRequires}
                        color={"white"}
                        accessibilityLabel="用于给残障人士显示的文本（比如读屏器软件可能会读取这一内容）"/>
                    {this.state.needsExpensive ? <VeryExpensive/> : null}
                    <TouchableHighlight
                        style={{flex: 1, backgroundColor: "blueviolet", justifyContent: "center", alignItems: "center"}}
                        activeOpacity={0.5}
                        underlayColor={"red"}
                        onPress={() => Vibration.vibrate(pattern)}
                        onShowUnderlay={() => {
                            console.log("当底层的颜色被显示的时候调用。")
                        }}
                        onHideUnderlay={() => {
                            console.log("当底层的颜色被隐藏的时候调用。")
                        }}>
                        <Text style={styles.textBtn}>TouchableHighlight</Text>
                    </TouchableHighlight>
                    <TouchableNativeFeedback
                        style={styles.touchable}
                        background={TouchableNativeFeedback.Ripple("white", true)}
                        onPress={() => {
                            Alert.alert(
                                "title：TouchableNativeFeedback",
                                "message：TouchableNativeFeedback",
                                [
                                    {
                                        text: '访问360搜索', onPress: () => {
                                            /**
                                             * 打开外部链接：
                                             * 要启动一个链接相对应的应用（打开浏览器、邮箱或者其它的应用），只需调用：Linking.openURL(url).catch(err => console.error('An error occurred', err));
                                             *
                                             * 如果想在打开链接前先检查是否安装了对应的应用，则调用以下方法：
                                             * canOpenURL(url: string, callback: Function)：
                                             * 判断设备上是否有已经安装的应用可以处理指定的URL。回调函数的参数只有一个：bool supported
                                             * @type {string}
                                             */
                                            let url = "https://www.so.com/"; //web链接
                                            // let url = "geo:37.484847,-122.148386"; //地理位置
                                            Linking.canOpenURL(url)
                                                .then(supported => {
                                                    if (!supported) {
                                                        console.log('Can\'t handle url: ' + url);
                                                    } else {
                                                        return Linking.openURL(url);
                                                    }
                                                })
                                                .catch(err => console.error('An error occurred', err));
                                        }
                                    },
                                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                    {
                                        text: '查看地理位置', onPress: () => {
                                            /**
                                             * 打开外部链接：
                                             * 要启动一个链接相对应的应用（打开浏览器、邮箱或者其它的应用），只需调用：Linking.openURL(url).catch(err => console.error('An error occurred', err));
                                             *
                                             * 如果想在打开链接前先检查是否安装了对应的应用，则调用以下方法：
                                             * canOpenURL(url: string, callback: Function)：
                                             * 判断设备上是否有已经安装的应用可以处理指定的URL。回调函数的参数只有一个：bool supported
                                             * @type {string}
                                             */
                                                // let url = "https://www.so.com/"; //web链接
                                            let url = "geo:37.484847,-122.148386"; //地理位置
                                            Linking.canOpenURL(url)
                                                .then(supported => {
                                                    if (!supported) {
                                                        console.log('Can\'t handle url: ' + url);
                                                    } else {
                                                        return Linking.openURL(url);
                                                    }
                                                })
                                                .catch(err => console.error('An error occurred', err));
                                        }
                                    },
                                ],
                                {cancelable: false}
                            )
                        }}>
                        <Text style={styles.textBtn}>TouchableNativeFeedback</Text>
                    </TouchableNativeFeedback>
                    <TouchableOpacity
                        style={styles.touchable}
                        onPress={this.touchableOpacityOnPress}
                        activeOpacity={0.1}>
                        <View style={styles.touchable} accessible={true} accessibilityLabel={"点我哦"}>
                            <Text style={styles.textBtn}>TouchableOpacity</Text>
                        </View>
                    </TouchableOpacity>
                    <CombinationComponent
                        style={styles.touchable}
                        onPress={this.shareText}
                        label={this.state.shareResult}/>
                    {/*<ScreenReaderStatusExample style={{flex: 1}}/>*/}
                    {/*活动指示器：显示一个圆形的loading提示符号。
                        animating bool：是否要显示指示器，默认为true，表示显示。
                        color string： 滚轮的前景颜色（默认为灰色）。
                        size enum('small', 'large')：指示器的大小。small的高度为20，large为36。*/}
                    <ActivityIndicator
                        animating={this.state.isLoading}
                        style={[styles.centering, {height: this.state.loadHeight}]}
                        size="large"/>
                    <Picker
                        style={{flex: 1, width: 200, color: "white"}}
                        selectedValue={this.state.language}
                        onValueChange={(lang) => this.setState({language: lang})}
                        mode={"dropdown"}>
                        <Picker.Item label="Java" value="java"/>
                        <Picker.Item label="JavaScript" value="js"/>
                        <Picker.Item label="HTML" value="html"/>
                    </Picker>
                    <StatusBar
                        animated={true}
                        hidden={true}
                        translucent={false}
                        backgroundColor="blue"
                        barStyle="light-content"/>
                    <DraggableView style={styles.draggableView}><Text>可拖拽的【AppState：{this.state.currentAppState}】</Text></DraggableView>
                </ImageBackground>
            </View>
        )

        /* //用InteractionManager来确保在执行繁重工作之前所有的交互和动画都已经处理完毕。
         InteractionManager.runAfterInteractions(() => {
             // 在交互结束之后执行：需要长时间同步执行的任务。
             this.getRemoteServerApi();
         });
         //InteractionManager还允许应用注册动画，在动画开始时创建一个交互“句柄”，然后在结束的时候清除它。
         var handle = InteractionManager.createInteractionHandle();
         // 执行动画... (`runAfterInteractions`中的任务现在开始排队等候)
         // 在动画完成之后
         InteractionManager.clearInteractionHandle(handle);
         // 在所有句柄都清除之后，现在开始依序执行队列中的任务
         //务必在卸载组件前清除定时器！
         // 在unmount组件时清除（clearTimeout/clearInterval）所有用到的定时器*/
    }

    /**
     * componentWillMount()：只会在装载之前调用一次，在 render之前调用；可以在这个方法里面调用setState改变状态，并且不会导致额外调用一次 render。官方建议用 constructor 代替
     *
     *在第一次渲染后调用，只在客户端。
     * 之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。
     * 可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等操作(防止异部操作阻塞UI)。
     * componentDidMount()：只会在装载完成之后调用一次，在 render之后调用，从这里开始可以通过ReactDOM.findDOMNode(this)获取到组件的 DOM 节点。
     */
    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange); //监听应用状态的变化。type参数应填change 。
        /**
         * getInitialURL()： 如果应用是被一个链接调起的，则会返回相应的链接地址。否则它会返回null。
         * Linking提供了一个通用的接口来与传入和传出的App链接进行交互。
         * 处理链接：如果你的应用被其注册过的外部url调起，则可以在任何组件内这样获取和处理它：
         */
        Linking.getInitialURL().then((url) => {
            if (url) {
                console.log('Initial url is: ' + url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    /**
     * 卸载组件触发。
     * 在组件从 DOM 中移除的时候立刻被调用。
     */
    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange); //移除一个监听函数。type参数应填change。
    }
}

/**
 * 所有的核心组件都接受名为style的属性。
 * 建议使用StyleSheet.create来集中定义组件的样式。
 * 最好是按顺序声明和使用style属性；以借鉴CSS中的“层叠”做法（即后声明的属性会覆盖先声明的同名属性）。
 *
 * hairlineWidth: CallExpression
 * 定义了当前平台上的最细的宽度。可以用作边框或是两个元素间的分隔线。例如：{ borderBottomColor: '#bbb', borderBottomWidth: StyleSheet.hairlineWidth }
 */
const styles = StyleSheet.create({
        container: {
            /**
             * 弹性（Flex）宽高
             * 在组件样式中使用flex可以使其在可利用的空间中动态地扩张或收缩。
             * 一般用flex:1来指定某个组件扩张以撑满所有剩余的空间。如果有多个并列的子组件使用了flex:1，则这些子组件会平分父容器中剩余的空间。
             * 如果这些并列的子组件的flex值不一样，则谁的值更大，谁占据剩余空间的比例就更大（即占据剩余空间的比等于并列组件间flex值的比）。
             */
            flex: 1,
            /**
             * 在组件的style中指定justifyContent可以决定其子元素沿着主轴（flexDirection:"row",这主轴方向为row）的排列方式。
             * 对应的这些可选项有：flex-start、center、flex-end、space-around以及space-between。
             */
            justifyContent: "center",
            /**
             * 在组件的style中指定alignItems可以决定其子元素沿着次轴（与主轴垂直的轴，比如若主轴方向为row，则次轴方向为column）的排列方式。
             * 对应的这些可选项有：flex-start、center、flex-end以及stretch。默认值为stretch
             */
            alignItems: "center",
            // height: 300,
            // backgroundColor: "lightblue",
        },
        title: {
            flex: 1,
            fontWeight: "bold",
            color: "blue",
            fontSize: 20,
            margin: 10,
            backgroundColor: 'blueviolet',
            /**
             * alignSelf  enum('auto', 'flex-start', 'flex-end', 'center', 'stretch') #
             * alignSelf决定了元素在父元素的次轴方向的排列方式（此样式设置在子元素上），其值会覆盖父元素的alignItems的值。
             */
            alignSelf: "flex-end"
        },
        imageView: {
            flex: 1,
            // flexDirection可以决定布子元素是沿着水平轴(row)方向排列，还是沿着竖直轴(column)方向排列呢？默认值是竖直轴(column)方向。
            flexDirection:
                "row",
        }
        ,
        image: {
            flex: 1,
            // color: "white",
        }
        ,
        test: {
            flex: 1,
            fontSize:
                10,
            color:
                "red",
            backgroundColor:
                'yellow',
        }
        ,
        inputTranslator: {
            flex: 1,
            flexDirection:
                "row",
            backgroundColor:
                'lightyellow',
            justifyContent:
                "center",
            alignItems:
                "center"
        }
        ,
        scrollView: {
            flex: 1,
            flexDirection:
                "row",
            margin:
                10,
        }
        ,
        headText: {
            fontWeight: "bold",
            color:
                "white",
            textAlign:
                "center"
        }
        ,
        touchable: {
            flex: 1,
            flexDirection:
                "row",
            justifyContent:
                "center",
            alignItems:
                "center"
        }
        ,
        textBtn: {
            flex: 1,
            fontWeight:
                "bold",
            color:
                "white",
            backgroundColor:
                "blueviolet",
            textAlignVertical:
                "center",
            textAlign:
                "center"
        }
        ,
        centering: {
            alignItems: 'center',
            justifyContent:
                'center',
        }
        ,
        draggableView: {
            /**
             * bottom值是指将本组件定位到距离底部多少个逻辑像素（底部的定义取决于position属性）。
             */
            bottom: 200,
            /**
             * left值是指将本组件定位到距离左边多少个逻辑像素（左边的定义取决于position属性）。
             */
            left: 10,
            /**
             * position enum('absolute', 'relative')
             */
            position: "absolute",
            /**
             * right值是指将本组件定位到距离右边多少个逻辑像素（右边的定义取决于position属性）。
             */
            right: 300,
            /**
             * top值是指将本组件定位到距离顶部多少个逻辑像素（顶部的定义取决于position属性）。
             */
            top: 0,
            /**
             * zIndex控制哪些组件显示在其他组件之上。
             * 通常，无需使用zIndex。 组件根据文档树中的顺序进行渲染，因此后面的组件会绘制先前的组件。 如果有不想要此行为的动画或自定义模式接口，则zIndex可能很有用。
             * 它的工作方式类似于CSS z-index属性 - 具有较大zIndex的组件将呈现在顶部。 想象一下z方向，就像从手机指向你的眼球一样。
             */
            zIndex: 0,
        },

    })
;

/**
 * NetInfo模块可以获知设备联网或离线的状态信息。
 */
NetInfo.addEventListener('connectionChange', handleFirstConnectivityChange);
NetInfo.getConnectionInfo().then((connectionInfo) => {
    console.log(' Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
});
/**
 * isConnected: ObjectExpression
 * 此属性为一个对象，也可调用NetInfo方法。但其监听函数接受的参数为一个布尔值，仅仅能表明当前网络是否联通。如果你只关心设备是否连上网了（不关心网络类型），那么使用此属性即可。
 * fetch()：返回一个promise，用于获取当前的网络状况/类型。
 */
NetInfo.isConnected.fetch().done((isConnected) => {
    console.log(' First, is ' + (isConnected ? ' online' : ' offline'));
});

function handleFirstConnectivityChange(connectionInfo) {
    console.log(' First change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
    NetInfo.removeEventListener(' connectionChange', handleFirstConnectivityChange);
}


/**
 * 监听设备上的后退按钮事件。
 *监听函数是按倒序的顺序执行（即后添加的函数先执行）。如果某一个函数返回true，则后续的函数都不会被调用。
 */
BackHandler.addEventListener(' hardwareBackPress', function () {
    console.log("hardwareBackPress");
    // BackHandler.exitApp();
    return true;
})

/**
 * 如果要在Android上使用LayoutAnimation，目前还需要在UIManager中启用
 */
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
