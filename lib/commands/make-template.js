const {Args, Command, Flags} = require('@oclif/core')
const { readFile } = require("fs/promises")

class MakeTemplate extends Command {
  static args = {
    mode_file: Args.string({description: 'JSON mode file', required: true}),
  }

  static description = 'Generates a markdown template from a mode file, which can then be compiled to complete markdown'

  static examples = [
    '<%= config.bin %> <%= command.id %> mode.json',
  ]

  static flags = {}

  async run() {
    const {args, flags} = await this.parse(MakeTemplate)

    const contents = await readFile(args.mode_file, {encoding: "utf-8"});
    const parsed = JSON.parse(contents);

    for (let className of Object.keys(parsed.classes)){
      this.log(`## ${className}\n`);
      this.log(`### Properties\n`);
      this.log(`\${rules.${className}}\n`);
    }
  }
}

module.exports = MakeTemplate
