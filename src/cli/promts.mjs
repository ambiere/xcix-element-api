import prompts from "prompts"

export default class Prompts {
  static async credential() {
    const questions = [
      {
        type: "text",
        name: "username",
        message: "username",
      },
      {
        type: "password",
        name: "password",
        message: "password",
      },
    ]
    const resp = await prompts(questions, { onCancel: Prompts.onCancel })
    return resp
  }

  static async whatToUpdate() {
    const questions = [
      {
        type: "confirm",
        name: "value",
        message: "Update all elements?",
        initial: true,
      },
      {
        type: prev => (prev === false ? "list" : null),
        name: "elementsToUpdate",
        message: "Enter name of the element(s) you want to update. [separated by a comma]",
        initial: "",
        separator: ",",
      },
    ]
    const resp = await prompts(questions, { onCancel: Prompts.onCancel })
    return resp
  }

  static onCancel(prompt) {
    process.exit()
  }
}
