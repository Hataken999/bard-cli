import { Bard } from "googlebard";
import { config } from "dotenv";
import readline from "readline";

config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let cookies = `__Secure-1PSID=<YOUR_COOKIES>`; // Put your cookies value here

let bot = new Bard(cookies, {
inMemory: false,
savePath: './conversations.json', // essential for remembering the conversation (not so good though)
});

const conversationId = 'test_id'; // the conversation ID used for addressing the conversation

// Main function for CLI, don't change if you don't know what you do.
async function main() {
  while (true) {
    let prompt = await new Promise((resolve) => {
      rl.question("Hataken: ", (answer) => {
        resolve(answer);
      });
    });
    
    process.stdout.write("Google Bard: ");
    await bot.askStream(res => {
      process.stdout.write(res.toString());
    }, prompt, conversationId);
    console.log("\n");
  }
}

main();
