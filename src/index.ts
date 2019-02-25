import { DomainChecker, WhoisResponse } from './modules/domain-checker';

const domainChecker = new DomainChecker();
domainChecker.getInfo('sylwia-polinska.pl').then((data: WhoisResponse) => {
  console.log(DomainChecker.getDomainShortInfo(data));
});
