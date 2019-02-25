
export interface WhoisResponse {
  domainName: string;
  creationDate: string;
  updatedDate: string;
  registrarRegistrationExpirationDate: string;
}
export class DomainChecker {
  async getInfo(domain: string): Promise<WhoisResponse> {
    const whois = require('whois-promise');
    const unknownResponse = 'unknown';
    const response = await whois.json(domain);
    const whoisResponse: WhoisResponse = {
      creationDate: [
        response.creationDate,
        response.created,
      ].find(element => element) || unknownResponse,
      domainName: response.domainName || unknownResponse,
      registrarRegistrationExpirationDate: [
        response.registrarRegistrationExpirationDate,
        response.expirationDate,
        response.renewalDate,
      ].find(element => element) || unknownResponse,
      updatedDate: [
        response.updatedDate,
        response.lastModified,
      ].find(element => element) || unknownResponse,
    };

    return new Promise((resolve, reject) => {
      resolve(whoisResponse);
    });
  }

  static getDomainShortInfo(response: WhoisResponse): string {
    const dateString = DomainChecker.formatDate(response.registrarRegistrationExpirationDate);

    return `${response.domainName} (expires on ${dateString})`;
  }

  private static formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }
}
