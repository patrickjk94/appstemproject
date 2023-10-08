class SimpleJobQueue {

    constructor() {
      this.queue = [];
      this.processing = false;
    }
  
    addJob(job) {
      this.queue.push(job);
      //TODO: Update status to be Queued
      this.processNextJob();
    }
  
    async processNextJob() {
      if (this.queue.length === 0 || this.processing) {
        return;
      }
  
      this.processing = true;
      const job = this.queue.shift();
      //TODO: Update status to be Processing 
  
      try {
        await job();
        console.log('Job processed successfully!');
        // TODO: Update status to be Success  
      } catch (error) {
        console.error('Job failed:', error);
        // TODO: Update status to be Failed 
      } finally {
        this.processing = false;
        this.processNextJob();
      }
    }
  }

const simpleJobQueue = new SimpleJobQueue();

module.exports = simpleJobQueue;