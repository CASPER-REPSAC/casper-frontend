import React from "react";
import "components/extern/terminal/style.css";

export const TerminalApp = () => {
  const [theme, setTheme] = React.useState("dark");
  const themeVars =
    theme === "dark"
      ? {
          app: { backgroundColor: "#333444" },
          terminal: { boxShadow: "0 2px 5px #111" },
          window: { backgroundColor: "#222345", color: "#F4F4F4" },
          field: {
            backgroundColor: "#222333",
            color: "#F4F4F4",
            fontWeight: "normal",
          },
          cursor: { animation: "1.02s blink-dark step-end infinite" },
        }
      : {
          app: { backgroundColor: "#ACA9BB" },
          terminal: { boxShadow: "0 2px 5px #33333375" },
          window: { backgroundColor: "#5F5C6D", color: "#E3E3E3" },
          field: {
            backgroundColor: "#E3E3E3",
            color: "#474554",
            fontWeight: "bold",
          },
          cursor: { animation: "1.02s blink-light step-end infinite" },
        };

  return (
    <div id="terminal-app" style={themeVars.app}>
      <Terminal theme={themeVars} setTheme={setTheme} />
    </div>
  );
};

const Terminal = ({ theme, setTheme }) => {
  const [maximized, setMaximized] = React.useState(false);
  const [title, setTitle] = React.useState("Casper Terminal");
  const handleClose = () => window.close();
  const handleMinMax = () => {
    setMaximized(!maximized);
    document.querySelector("#field").focus();
  };

  return (
    <div
      id="terminal"
      style={
        maximized
          ? { height: "100vh", width: "100vw", maxWidth: "100vw" }
          : theme.terminal
      }
    >
      <div id="window" style={theme.window}>
        <button className="terminal-btn red" onClick={handleClose} />
        <button id="useless-btn" className="terminal-btn yellow" />
        <button className="terminal-btn green" onClick={handleMinMax} />
        <span id="title" style={{ color: theme.window.color }}>
          {title}
        </span>
      </div>
      <Field theme={theme} setTheme={setTheme} setTitle={setTitle} />
    </div>
  );
};

class Field extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commandHistory: [],
      commandHistoryIndex: 0,
      fieldHistory: [
        { text: "Casper Terminal" },
        {
          text: "Type HELP to see the full list of commands.",
          hasBuffer: true,
        },
      ],
      userInput: "",
      isMobile: false,
    };
    this.recognizedCommands = [
      {
        command: "help",
        purpose: "Provides help information for React Terminal commands.",
      },
      {
        command: "date",
        purpose: "Displays the current date.",
      },
      {
        command: "start",
        purpose: "Launches a specified URL in a new tab or separate window.",
        help: [
          "START <URL>",
          "Launches a specified URL in a new tab or separate window.",
          "",
          "URL......................The website you want to open.",
        ],
      },
      {
        command: "cls",
        purpose: "Clears the screen.",
      },
      {
        command: "cmd",
        purpose: "Starts a new instance of the React Terminal.",
      },
      {
        command: "theme",
        purpose: "Sets the color scheme of the React Terminal.",
        help: [
          "THEME <L|LIGHT|D|DARK> [-s, -save]",
          "Sets the color scheme of the React Terminal.",
          "",
          "L, LIGHT.................Sets the color scheme to light mode.",
          "D, DARK..................Sets the color scheme to dark mode.",
          "",
          "-s, -save................Saves the setting to localStorage.",
        ],
      },
      {
        command: "exit",
        purpose:
          "Quits the React Terminal and returns to casper's github page.",
      },
      {
        command: "time",
        purpose: "Displays the current time.",
      },
      {
        command: "about",
        isMain: true,
        purpose: "Displays basic information about Casper.",
      },
      {
        command: "developer",
        isMain: true,
        purpose: "Displays information about Developer",
      },
      {
        command: "contact",
        isMain: true,
        purpose: "Displays contact information for Developer.",
      },
      {
        command: "title",
        purpose: "Sets the window title for the React Terminal.",
        help: [
          "TITLE <INPUT>",
          "Sets the window title for the React Terminal.",
          "",
          "INPUT....................The title you want to use for the React Terminal window.",
        ],
      },
      ...["google", "duckduckgo", "bing"].map((cmd) => {
        const properCase =
          cmd === "google"
            ? "Google"
            : cmd === "duckduckgo"
            ? "DuckDuckGo"
            : "Bing";

        return {
          command: cmd,
          purpose: `Searches a given query using ${properCase}.`,
          help: [
            `${cmd.toUpperCase()} <QUERY>`,
            `Searches a given query using ${properCase}. If no query is provided, simply launches ${properCase}.`,
            "",
            `QUERY....................It's the same as if you were to type inside the ${properCase} search bar.`,
          ],
        };
      }),
    ];
    this.handleTyping = this.handleTyping.bind(this);
    this.handleInputEvaluation = this.handleInputEvaluation.bind(this);
    this.handleInputExecution = this.handleInputExecution.bind(this);
    this.handleContextMenuPaste = this.handleContextMenuPaste.bind(this);
  }
  componentDidMount() {
    if (
      typeof window.orientation !== "undefined" ||
      navigator.userAgent.indexOf("IEMobile") !== -1
    ) {
      this.setState((state) => ({
        isMobile: true,
        fieldHistory: [
          ...state.fieldHistory,
          { isCommand: true },
          {
            text: `Unfortunately due to this application being an 'input-less' environment, mobile is not supported. I'm working on figuring out how to get around this, so please bear with me! In the meantime, come on back if you're ever on a desktop.`,
            isError: true,
            hasBuffer: true,
          },
        ],
      }));
    } else {
      const userElem = document.querySelector("#field");
      const themePref = window.localStorage.getItem("reactTerminalThemePref");

      // Disable this if you're working on a fork with auto run enabled... trust me.
      userElem.focus();

      document.querySelector("#useless-btn").addEventListener("click", () =>
        this.setState((state) => ({
          fieldHistory: [
            ...state.fieldHistory,
            { isCommand: true },
            {
              text: "SYS >> That button doesn't do anything.",
              hasBuffer: true,
            },
          ],
        }))
      );

      if (themePref) {
        this.props.setTheme(themePref);
      }
    }
  }
  componentDidUpdate() {
    const userElem = document.querySelector("#field");

    userElem.scrollTop = userElem.scrollHeight;
  }
  handleTyping(e) {
    e.preventDefault();

    const { key, ctrlKey, altKey } = e;
    const forbidden = [
      ...Array.from({ length: 12 }, (x, y) => `F${y + 1}`),
      "ContextMenu",
      "Meta",
      "NumLock",
      "Shift",
      "Control",
      "Alt",
      "CapsLock",
      "Tab",
      "ScrollLock",
      "Pause",
      "Insert",
      "Home",
      "PageUp",
      "Delete",
      "End",
      "PageDown",
    ];

    if (!forbidden.some((s) => s === key) && !ctrlKey && !altKey) {
      if (key === "Backspace") {
        this.setState(
          (state) => (state.userInput = state.userInput.slice(0, -1))
        );
      } else if (key === "Escape") {
        this.setState({ userInput: "" });
      } else if (key === "ArrowUp" || key === "ArrowLeft") {
        const { commandHistory, commandHistoryIndex } = this.state;
        const upperLimit = commandHistoryIndex >= commandHistory.length;

        if (!upperLimit) {
          this.setState((state) => ({
            commandHistoryIndex: (state.commandHistoryIndex += 1),
            userInput: state.commandHistory[state.commandHistoryIndex - 1],
          }));
        }
      } else if (key === "ArrowDown" || key === "ArrowRight") {
        const { commandHistory, commandHistoryIndex } = this.state;
        const lowerLimit = commandHistoryIndex === 0;

        if (!lowerLimit) {
          this.setState((state) => ({
            commandHistoryIndex: (state.commandHistoryIndex -= 1),
            userInput:
              state.commandHistory[state.commandHistoryIndex - 1] || "",
          }));
        }
      } else if (key === "Enter") {
        const { userInput } = this.state;

        if (userInput.length) {
          this.setState(
            (state) => ({
              commandHistory:
                userInput === ""
                  ? state.commandHistory
                  : [userInput, ...state.commandHistory],
              commandHistoryIndex: 0,
              fieldHistory: [
                ...state.fieldHistory,
                { text: userInput, isCommand: true },
              ],
              userInput: "",
            }),
            () => this.handleInputEvaluation(userInput)
          );
        } else {
          this.setState((state) => ({
            fieldHistory: [...state.fieldHistory, { isCommand: true }],
          }));
        }
      } else {
        this.setState((state) => ({
          commandHistoryIndex: 0,
          userInput: (state.userInput += key),
        }));
      }
    }
  }
  handleInputEvaluation(input) {
    try {
      const evaluatedForArithmetic = Math.evaluate(input);

      if (!isNaN(evaluatedForArithmetic)) {
        return this.setState((state) => ({
          fieldHistory: [
            ...state.fieldHistory,
            { text: evaluatedForArithmetic },
          ],
        }));
      }

      throw Error;
    } catch (err) {
      const { recognizedCommands, giveError, handleInputExecution } = this;
      const cleanedInput = input.toLowerCase().trim();
      const dividedInput = cleanedInput.split(" ");
      const parsedCmd = dividedInput[0];
      const parsedParams = dividedInput.slice(1).filter((s) => s[0] !== "-");
      const parsedFlags = dividedInput.slice(1).filter((s) => s[0] === "-");
      const isError = !recognizedCommands.some((s) => s.command === parsedCmd);

      if (isError) {
        return this.setState((state) => ({
          fieldHistory: [...state.fieldHistory, giveError("nr", input)],
        }));
      }

      return handleInputExecution(parsedCmd, parsedParams, parsedFlags);
    }
  }
  handleInputExecution(cmd, params = [], flags = []) {
    if (cmd === "help") {
      if (params.length) {
        if (params.length > 1) {
          return this.setState((state) => ({
            fieldHistory: [
              ...state.fieldHistory,
              this.giveError("bp", { cmd: "HELP", noAccepted: 1 }),
            ],
          }));
        }

        const cmdsWithHelp = this.recognizedCommands.filter((s) => s.help);

        if (cmdsWithHelp.filter((s) => s.command === params[0]).length) {
          return this.setState((state) => ({
            fieldHistory: [
              ...state.fieldHistory,
              {
                text: cmdsWithHelp.filter((s) => s.command === params[0])[0]
                  .help,
                hasBuffer: true,
              },
            ],
          }));
        } else if (
          this.recognizedCommands.filter((s) => s.command === params[0]).length
        ) {
          return this.setState((state) => ({
            fieldHistory: [
              ...state.fieldHistory,
              {
                text: [
                  `No additional help needed for ${this.recognizedCommands
                    .filter((s) => s.command === params[0])[0]
                    .command.toUpperCase()}`,
                  this.recognizedCommands.filter(
                    (s) => s.command === params[0]
                  )[0].purpose,
                ],
                hasBuffer: true,
              },
            ],
          }));
        }

        return this.setState((state) => ({
          fieldHistory: [
            ...state.fieldHistory,
            this.giveError("up", params[0].toUpperCase()),
          ],
        }));
      }

      return this.setState((state) => ({
        fieldHistory: [
          ...state.fieldHistory,
          {
            text: [
              "Main commands:",
              ...this.recognizedCommands
                .sort((a, b) => a.command.localeCompare(b.command))
                .filter(({ isMain }) => isMain)
                .map(
                  ({ command, purpose }) =>
                    `${command.toUpperCase()}${Array.from(
                      { length: 15 - command.length },
                      (x) => "."
                    ).join("")}${purpose}`
                ),
              "",
              "All commands:",
              ...this.recognizedCommands
                .sort((a, b) => a.command.localeCompare(b.command))
                .map(
                  ({ command, purpose }) =>
                    `${command.toUpperCase()}${Array.from(
                      { length: 15 - command.length },
                      (x) => "."
                    ).join("")}${purpose}`
                ),
              "",
              "For help about a specific command, type HELP <CMD>, e.g. HELP ABOUT.",
            ],
            hasBuffer: true,
          },
        ],
      }));
    } else if (cmd === "cls") {
      return this.setState({ fieldHistory: [] });
    } else if (cmd === "start") {
      if (params.length === 1) {
        return this.setState(
          (state) => ({
            fieldHistory: [
              ...state.fieldHistory,
              { text: `Launching ${params[0]}...`, hasBuffer: true },
            ],
          }),
          () =>
            window.open(
              /http/i.test(params[0]) ? params[0] : `https://${params[0]}`
            )
        );
      }

      return this.setState((state) => ({
        fieldHistory: [
          ...state.fieldHistory,
          this.giveError("bp", { cmd: "START", noAccepted: 1 }),
        ],
      }));
    } else if (cmd === "date") {
      return this.setState((state) => ({
        fieldHistory: [
          ...state.fieldHistory,
          {
            text: `The current date is: ${new Date(
              Date.now()
            ).toLocaleDateString()}`,
            hasBuffer: true,
          },
        ],
      }));
    } else if (cmd === "cmd") {
      return this.setState(
        (state) => ({
          fieldHistory: [
            ...state.fieldHistory,
            {
              text: "Launching new instance of the React Terminal...",
              hasBuffer: true,
            },
          ],
        }),
        () => window.open("/terminal")
      );
    } else if (cmd === "theme") {
      const { setTheme } = this.props;
      const validParams =
        params.length === 1 &&
        ["d", "dark", "l", "light"].some((s) => s === params[0]);
      const validFlags = flags.length
        ? flags.length === 1 && (flags[0] === "-s" || flags[0] === "-save")
          ? true
          : false
        : true;

      if (validParams && validFlags) {
        const themeToSet =
          params[0] === "d" || params[0] === "dark" ? "dark" : "light";

        return this.setState(
          (state) => ({
            fieldHistory: [
              ...state.fieldHistory,
              {
                text: `Set the theme to ${themeToSet.toUpperCase()} mode`,
                hasBuffer: true,
              },
            ],
          }),
          () => {
            if (
              flags.length === 1 &&
              (flags[0] === "-s" || flags[0] === "-save")
            ) {
              window.localStorage.setItem("reactTerminalThemePref", themeToSet);
            }

            setTheme(themeToSet);
          }
        );
      }

      return this.setState((state) => ({
        fieldHistory: [
          ...state.fieldHistory,
          this.giveError(
            !validParams ? "bp" : "bf",
            !validParams ? { cmd: "THEME", noAccepted: 1 } : "THEME"
          ),
        ],
      }));
    } else if (cmd === "exit") {
      return (window.location.href = "https://github.com/CASPER-REPSAC");
    } else if (cmd === "time") {
      return this.setState((state) => ({
        fieldHistory: [
          ...state.fieldHistory,
          {
            text: `The current time is: ${new Date(
              Date.now()
            ).toLocaleTimeString()}`,
            hasBuffer: true,
          },
        ],
      }));
    } else if (cmd === "about") {
      return this.setState((state) => ({
        fieldHistory: [
          ...state.fieldHistory,
          {
            text: [
              "Hello :>",
              `My name is Casper. I'm security club in changwon university.`,
              `Let's study hard and play with us! (งᐖ)ว`,
            ],
            hasBuffer: true,
          },
        ],
      }));
    } else if (cmd === "developer") {
      return this.setState((state) => ({
        fieldHistory: [
          ...state.fieldHistory,
          {
            text: [
              "Hello there.",
              `I'm a student studying service planning and software development and security. I am interested in automation, convenient service development, and active defense technology such as deception.`,
              `Type CONTACT if you'd like to get in touch - otherwise I hope you enjoy using the rest of the service.`,
            ],
            hasBuffer: true,
          },
        ],
      }));
    } else if (cmd === "contact") {
      return this.setState((state) => ({
        fieldHistory: [
          ...state.fieldHistory,
          {
            text: [
              "Email: deanh0716@gmail.com",
              "GitHub: @Nevaland",
              "kakao: open.kakao.com/me/neva",
            ],
            hasBuffer: true,
          },
        ],
      }));
    } else if (cmd === "title") {
      return this.setState(
        (state) => ({
          fieldHistory: [
            ...state.fieldHistory,
            {
              text: `Set the React Terminal title to ${
                params.length > 0 ? params.join(" ") : "<BLANK>"
              }`,
              hasBuffer: true,
            },
          ],
        }),
        () => this.props.setTitle(params.length > 0 ? params.join(" ") : "")
      );
    } else if (["google", "duckduckgo", "bing"].some((s) => s === cmd)) {
      return this.setState(
        (state) => ({
          fieldHistory: [
            ...state.fieldHistory,
            {
              text: params.length
                ? `Searching ${cmd.toUpperCase()} for ${params.join(" ")}...`
                : `Launching ${cmd.toUpperCase()}...`,
              hasBuffer: true,
            },
          ],
        }),
        () =>
          window.open(
            params.length
              ? `https://${cmd}.com/${
                  cmd === "google" ? "search" : ""
                }?q=${params.join("+")}`
              : `https://${cmd}.com/`,
            "_blank"
          )
      );
    }
  }
  handleContextMenuPaste(e) {
    e.preventDefault();

    if ("clipboard" in navigator) {
      navigator.clipboard.readText().then((clipboard) =>
        this.setState((state) => ({
          userInput: `${state.userInput}${clipboard}`,
        }))
      );
    }
  }
  giveError(type, extra) {
    const err = { text: "", isError: true, hasBuffer: true };

    if (type === "nr") {
      err.text = `${extra} : The term or expression '${extra}' is not recognized. Check the spelling and try again. If you don't know what commands are recognized, type HELP.`;
    } else if (type === "nf") {
      err.text = `The ${extra} command requires the use of flags. If you don't know what flags can be used, type HELP ${extra}.`;
    } else if (type === "bf") {
      err.text = `The flags you provided for ${extra} are not valid. If you don't know what flags can be used, type HELP ${extra}.`;
    } else if (type === "bp") {
      err.text = `The ${extra.cmd} command requires ${extra.noAccepted} parameter(s). If you don't know what parameter(s) to use, type HELP ${extra.cmd}.`;
    } else if (type === "up") {
      err.text = `The command ${extra} is not supported by the HELP utility.`;
    }

    return err;
  }
  render() {
    const { theme } = this.props;
    const { fieldHistory, userInput } = this.state;

    return (
      <div
        id="field"
        className={theme.app.backgroundColor === "#333444" ? "dark" : "light"}
        style={theme.field}
        onKeyDown={(e) => this.handleTyping(e)}
        tabIndex={0}
        onContextMenu={(e) => this.handleContextMenuPaste(e)}
      >
        {fieldHistory.map(({ text, isCommand, isError, hasBuffer }) => {
          if (Array.isArray(text)) {
            return (
              <MultiText input={text} isError={isError} hasBuffer={hasBuffer} />
            );
          }

          return (
            <Text
              input={text}
              isCommand={isCommand}
              isError={isError}
              hasBuffer={hasBuffer}
            />
          );
        })}
        <UserText input={userInput} theme={theme.cursor} />
      </div>
    );
  }
}
const Text = ({ input, isCommand, isError, hasBuffer }) => (
  <>
    <div>
      {isCommand && <div id="query">{"guest@casper>"}</div>}
      <span className={!isCommand && isError ? "error" : ""}>{input}</span>
    </div>
    {hasBuffer && <div></div>}
  </>
);
const MultiText = ({ input, isError, hasBuffer }) => (
  <>
    {input.map((s) => (
      <Text input={s} isError={isError} />
    ))}
    {hasBuffer && <div></div>}
  </>
);
const UserText = ({ input, theme }) => (
  <div>
    <div id="query">{"guest@casper>"}</div>
    <span>{input}</span>
    <div id="cursor" style={theme}></div>
  </div>
);
