import { exec } from "node:child_process";
import { promisify } from "node:util";

const execPromise = promisify(exec);

/**
 * Executes a shell command using promisified exec.
 *
 * @param {string} cmd - The command to execute.
 * @returns {Promise<{result: string | null, error: string | null}>}
 */
async function runCommand(cmd) {
  try {
    const { stdout, stderr } = await execPromise(cmd);
    return { result: stdout, error: stderr || null };
  } catch (error) {
    return { result: null, error: error.message };
  }
}

export { runCommand };
