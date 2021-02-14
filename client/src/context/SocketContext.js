import react, {PureComponent} from "react";
import io from "socket.io-client"


export const SocketContext = react.createContext({
    socket: null,
    isSocketConnected: false
});

export default class SocketState extends PureComponent{

    constructor(props){
        super(props);
        this.url = props.url;
        this.state = {
            socket: null,
            isSocketConnected: false
        }
        this.mounted = false;
    }

    componentWillUnmount(){
        this.mounted = false;
        this.state.socket.disconnect();
    }

    componentDidMount(){
        this.mounted = true;
        let socket = io.connect(this.url);
        socket.on("connect", () => {
            if(this.mounted){
                console.log("Connected!");
                this.setState({
                    socket: socket,
                    isSocketConnected: true
                });
            }
        });
    }

    render() {
        return (
          <div>
            <SocketContext.Provider
              value={{
                socket: this.state.socket,
                isSocketConnected: this.state.isSocketConnected
              }}
            >
              {this.props.children}
            </SocketContext.Provider>
          </div>
        );
      }
}

