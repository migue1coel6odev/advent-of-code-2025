export function readFromFile(fileName: string) {
  return Bun.file(fileName);
}

interface QueueItemGetFile {
  type: "GET_FILE";
  payload: Bun.BunFile;
}

interface QueueItemJson {
  type: "PARSE_JSON";
  payload: unknown;
}

interface QueueItemText {
  type: "PARSE_TEXT";
  payload: string;
}

type QueueItems = QueueItemGetFile | QueueItemJson | QueueItemText;

class ReadFromFile {
  private file?: Bun.BunFile;
  private queue: Array<Promise<QueueItems>> = [];

  constructor(private fileName: string) {}

  async read() {
    this.addToQueue("GET_FILE", async () => Bun.file(this.fileName));

    return this;
  }

  parseJson() {
    // this.addToQueue('PARSE_JSON', )
  }

  private addToQueue(
    type: QueueItems["type"],
    callback: () => Promise<QueueItems["payload"]>
  ) {
    const e = new Promise<QueueItems>(async (resolve) => {
      resolve({
        type,
        payload: await callback(),
      } as QueueItems);
    });
    this.queue.push(e);
  }
}
