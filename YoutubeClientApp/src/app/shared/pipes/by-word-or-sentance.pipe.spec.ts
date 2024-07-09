import { ByWordOrSentancePipe } from './by-word-or-sentance.pipe';

describe('ByWordOrSentancePipe', () => {
  it('create an instance', () => {
    const pipe = new ByWordOrSentancePipe();
    expect(pipe).toBeTruthy();
  });
});
