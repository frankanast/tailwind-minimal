const messages = [
    {
        id: 1,
        sender: {
            id: "0957392",
            username: "programmer93",
            profile_pic: "https://avatars.githubusercontent.com/u/82828758?v=4",
            hexColor: "#af2727",
            initials: "PR"
        },
        message: {
            type: "text",
            quotes: null,
            content: "Hey everyone! 👋",
            datetime_sent: "2024-08-23T10:15:30Z"
        }
    },
    {
        id: 2,
        sender: {
            id: "0462846",
            username: "tech_guru",
            profile_pic: "",
            hexColor: "#5271ff",
            initials: "TE"
        },
        message: {
            type: "text",
            quotes: null,
            content: "Hey! How's it going? 😄",
            datetime_sent: "2024-08-23T10:16:15Z"
        }
    },
    {
        id: 3,
        sender: {
            id: "0957392",
            username: "programmer93",
            profile_pic: "https://avatars.githubusercontent.com/u/82828758?v=4",
            hexColor: "#af2727",
            initials: "PR"
        },
        message: {
            type: "text",
            quotes: 2,
            content: "All good, just working on a new project. You? 💻",
            datetime_sent: "2024-08-23T10:17:02Z"
        }
    },
    {
        id: 4,
        sender: {
            id: "0584932",
            username: "dev_jane",
            profile_pic: "",
            hexColor: "#38a169",
            initials: "DE"
        },
        message: {
            type: "text",
            quotes: null,
            content: "Hey everyone! Just joined. What's up? 😊",
            datetime_sent: "2024-08-23T10:18:11Z"
        }
    },
    {
        id: 5,
        sender: {
            id: "0462846",
            username: "tech_guru",
            profile_pic: "",
            hexColor: "#5271ff",
            initials: "TE"
        },
        message: {
            type: "text",
            quotes: 4,
            content: "Hey @dev_jane! We're just catching up.",
            datetime_sent: "2024-08-23T10:18:49Z"
        }
    },
    {
        id: 6,
        sender: {
            id: "0957392",
            username: "programmer93",
            profile_pic: "https://avatars.githubusercontent.com/u/82828758?v=4",
            hexColor: "#af2727",
            initials: "PR"
        },
        message: {
            type: "text",
            quotes: null,
            content: "Anyone else here working on AI projects? 🤖",
            datetime_sent: "2024-08-23T10:19:22Z"
        }
    },
    {
        id: 7,
        sender: {
            id: "0462846",
            username: "tech_guru",
            profile_pic: "",
            hexColor: "#5271ff",
            initials: "TE"
        },
        message: {
            type: "text",
            quotes: null,
            content: "I'm dabbling in AI, nothing serious yet. You?",
            datetime_sent: "2024-08-23T10:20:00Z"
        }
    },
    {
        id: 8,
        sender: {
            id: "0584932",
            username: "dev_jane",
            profile_pic: "",
            hexColor: "#38a169",
            initials: "DE"
        },
        message: {
            type: "text",
            quotes: 6,
            content: "Actually, yeah! I've been building a chatbot recently. 🤓",
            datetime_sent: "2024-08-23T10:21:12Z"
        }
    },
    {
        id: 9,
        sender: {
            id: "0957392",
            username: "programmer93",
            profile_pic: "https://avatars.githubusercontent.com/u/82828758?v=4",
            hexColor: "#af2727",
            initials: "PR"
        },
        message: {
            type: "text",
            quotes: 8,
            content: "That's awesome! Any tips for training it?",
            datetime_sent: "2024-08-23T10:22:03Z"
        }
    },
    {
        id: 10,
        sender: {
            id: "99999999",
            username: "_SYSTEM",
            profile_pic: "https://avatars.githubusercontent.com/u/82828758?v=4",
            hexColor: "#999999",
            initials: "_S"
        },
        message: {
            type: "text",
            quotes: null,
            content: "programmer93 has edited a template.",
            datetime_sent: "2024-08-23T10:22:03Z"
        }
    },
    {
        id: 11,
        sender: {
            id: "0584932",
            username: "dev_jane",
            profile_pic: "",
            hexColor: "#38a169",
            initials: "DE"
        },
        message: {
            type: "text",
            quotes: null,
            content: "Sure! I recommend focusing on quality data over quantity. 💡",
            datetime_sent: "2024-08-23T10:23:47Z"
        }
    },
    {
        id: 12,
        sender: {
            id: "0239847",
            username: "cyber_wizard",
            profile_pic: "",
            hexColor: "#ff6347",
            initials: "CY"
        },
        message: {
            type: "text",
            quotes: null,
            content: "Hey, sorry I'm late to the convo. What's happening? 🤔",
            datetime_sent: "2024-08-23T10:24:12Z"
        }
    },
    {
        id: 13,
        sender: {
            id: "0957392",
            username: "programmer93",
            profile_pic: "https://avatars.githubusercontent.com/u/82828758?v=4",
            hexColor: "#af2727",
            initials: "PR"
        },
        message: {
            type: "text",
            quotes: 11,
            content: "Hey @cyber_wizard! Just talking AI and projects. 😊",
            datetime_sent: "2024-08-23T10:25:00Z"
        }
    },
    {
        id: 14,
        sender: {
            id: "0462846",
            username: "tech_guru",
            profile_pic: "",
            hexColor: "#5271ff",
            initials: "TE"
        },
        message: {
            type: "text",
            quotes: null,
            content: "Also talking about data quality for training AI models. Good stuff!",
            datetime_sent: "2024-08-23T10:25:38Z"
        }
    },
    {
        id: 15,
        sender: {
            id: "0584932",
            username: "dev_jane",
            profile_pic: "",
            hexColor: "#38a169",
            initials: "DE"
        },
        message: {
            type: "text",
            quotes: 9,
            content: "Oh, and don't forget to experiment with different architectures!",
            datetime_sent: "2024-08-23T10:26:01Z"
        }
    },
    {
        id: 16,
        sender: {
            id: "0239847",
            username: "cyber_wizard",
            profile_pic: "",
            hexColor: "#ff6347",
            initials: "CY"
        },
        message: {
            type: "text",
            quotes: 14,
            content: "Great tip! I've been meaning to try that out. 🔍",
            datetime_sent: "2024-08-23T10:27:25Z"
        }
    },
    {
        id: 17,
        sender: {
            id: "0584932",
            username: "dev_jane",
            profile_pic: "",
            hexColor: "#38a169",
            initials: "DE"
        },
        message: {
            type: "text",
            quotes: 9,
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a mauris sit amet mi scelerisque porta. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec vitae tincidunt ipsum, et pretium sem. Etiam euismod mattis consectetur. Nullam at turpis sollicitudin, dapibus metus in, cursus est. Etiam vel eros quam. Duis lorem velit, dictum quis porttitor id, porta id elit. Morbi molestie arcu velit. Vivamus iaculis enim a lacus aliquet, id porta magna consequat. Mauris aliquet enim nec enim tincidunt, id pharetra odio lacinia. Sed augue elit, malesuada ac tellus nec, euismod consequat felis. Vestibulum sed augue.",
            datetime_sent: "2024-08-23T23:26:01Z"
        }
    }
]

export default messages;
