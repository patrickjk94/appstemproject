class SimpleJobQueue {

    constructor() {
      this.queue = [];
      this.processing = false;
    }
  
    addJob(job) {
      this.queue.push(job);
      this.processNextJob();
    }
  
    async processNextJob() {
      if (this.queue.length === 0 || this.processing) {
        return;
      }
  
      this.processing = true;
      const job = this.queue.shift();
  
      try {
        await job();
        console.log('Job processed successfully!');
      } catch (error) {
        console.error('Job failed:', error);
      } finally {
        this.processing = false;
        this.processNextJob();
      }
    }
  }

const simpleJobQueue = new SimpleJobQueue();

module.exports = simpleJobQueue;