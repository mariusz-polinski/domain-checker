import { DomainChecker, WhoisResponse } from '../domain-checker';

describe('domain-checker.getInfo', () => {
  const domainChecker = new DomainChecker();
  const sampleDomains = ['mozilla.org', 'reddit.com', 'sylwia-polinska.pl'];
  it('should return a Promise of a WhoisResponse', async () => {
    const promises: Promise<WhoisResponse>[] = [];
    sampleDomains.forEach(value => {
      promises.push(domainChecker.getInfo(value));
    });
    await Promise.all(promises).then( responses => {
      responses.forEach(response => {
        expect(response).toHaveProperty('domainName');
        expect(response).toHaveProperty('creationDate');
        expect(response).toHaveProperty('updatedDate');
        expect(response).toHaveProperty('registrarRegistrationExpirationDate');
      });
    });
  });
});

describe('domain-checker.formatDomainInfo', () => {
  const mockResponse = {
    creationDate: '2019.01.07 20:39:09',
    domainName: 'sample-domain.com',
    registrarRegistrationExpirationDate: '2019.01.07 20:39:09',
    updatedDate: '2019.01.07 20:39:09',
  };
  const correctResponse = 'sample-domain.com (expires on 07-01-2019)';

  it('should returned properly formatted domain info', () =>
    // is this trailing comma really necessary?
    expect(DomainChecker.getDomainShortInfo(mockResponse)).toBe(correctResponse),
  );
});
