import { useState } from "react";
import axios from "axios";

function App() {
    const [command, setCommand] = useState("");
    const [terminalOutput, setTerminalOutput] = useState("");
    function handleClick(string) {
        axios
            .post("http://localhost:80/mouse", {
                action: string,
            })
            .then(() => {})
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCommand() {
        axios
            .post("http://localhost:80/terminal", {
                command: command,
            })
            .then((data) => setTerminalOutput(data.data.output))
            .catch((err) => {
                console.log(err);
            });
    }

    function handleScreenshot() {
        axios
            .get("http://localhost:80/screenshot", {
                command: command,
            })
            .then((data) => console.log(data))
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-1">
                <div
                    className="flex justify-center border border-black p-1 m-1 flex justify-center"
                    onClick={() => handleClick("up")}
                >
                    Up
                </div>
                <div className="grid grid-cols-2">
                    <div
                        className="border border-black p-1 m-1 flex justify-center"
                        onClick={() => handleClick("left")}
                    >
                        Left
                    </div>
                    <div
                        className="border border-black p-1 m-1 flex justify-center"
                        onClick={() => handleClick("right")}
                    >
                        Right
                    </div>
                </div>
                <div
                    className="flex justify-center border border-black p-1 m-1 flex justify-center"
                    onClick={() => handleClick("down")}
                >
                    Down
                </div>
                <div className="grid grid-cols-2">
                    <div
                        className="border border-black p-1 m-1 flex justify-center"
                        onClick={() => handleClick("click")}
                    >
                        Click
                    </div>
                    <div
                        className="border border-black p-1 m-1 flex justify-center"
                        onClick={() => handleClick("double-click")}
                    >
                        Double Click
                    </div>
                </div>
                <div className="grid grid-cols-2">
                    <div
                        className="border border-black p-1 m-1 flex justify-center"
                        onClick={() => handleClick("scroll-up")}
                    >
                        Scroll Up
                    </div>
                    <div
                        className="border border-black p-1 m-1 flex justify-center"
                        onClick={() => handleClick("scroll-down")}
                    >
                        Scroll Down
                    </div>
                </div>
                <div className="grid grid-cols-2">
                    <div
                        className="border border-black p-1 m-1 flex justify-center"
                        onClick={() => handleClick("p-button")}
                    >
                        Press Button
                    </div>
                    <div
                        className="border border-black p-1 m-1 flex justify-center"
                        onClick={() => handleClick("r-button")}
                    >
                        Release Button
                    </div>
                </div>
                <div className="border border-black grid grid-cols-1">
                    <input
                        className="p-1"
                        type="text"
                        placeholder="execute commands"
                        value={command}
                        onChange={(e) => setCommand(e.target.value)}
                    />
                    <button
                        className="text-white bg-black mt-1"
                        onClick={handleCommand}
                    >
                        Execute
                    </button>
                </div>
                <div style={{ maxWidth: "300px" }}>
                    {terminalOutput === "" ? (
                        <div></div>
                    ) : (
                        <div>{JSON.stringify(terminalOutput)}</div>
                    )}
                </div>
                <div>
                    <div onClick={handleScreenshot}>ScreenShot</div>
                </div>
            </div>
        </div>
    );
}

export default App;
