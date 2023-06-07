import * as dotenv from "dotenv";
import * as crypto from "crypto";
dotenv.config();

/**
 @example
  //Encrypter sınıfının örneği oluşturuluyor ve "5554443322" şifreleme anahtarı ile oluşturuluyor.
  var encrypterSender = new Encrypter("5554443322");

  //encryptMessage metodu kullanılarak "Hello World" metni "5553332211" telefon numarasına şifreleniyor ve şifreli metin "encryptedMessage" değişkenine atanıyor.
  var encryptedMessage  = encrypterSender.encryptMessage("Hello World","5553332211");

  //Encrypter sınıfından bir örnek oluşturuluyor ve bu sefer "5553332211" şifreleme anahtarı ile oluşturuluyor.
  var encrypterReceiver = new Encrypter("5553332211");

  //decryptMessage metodu kullanılarak "encryptedMessage" değişkenindeki şifreli metin "5554443322" şifreleme anahtarı kullanılarak çözülüyor ve orijinal metin "decryptedMessage" değişkenine atanıyor.
  var decryptedMessage = encrypter2.decryptMessage(e,"5554443322");

  //decryptMessage değişkenindeki orijinal metin konsola yazdırılıyor.
  console.log(decryptMessage); //Hello World
*/
export class Encrypter {
  private readonly secretKey!: string;
  private readonly ecdh!: crypto.ECDH;

  /**
  @param {string} key - ECDH algoritmasında kullanılacak key
  @example
  //Encrypter sınıfının örneği oluşturuluyor ve "5554443322" şifreleme anahtarı ile oluşturuluyor.
  const encrypterSender = new Encrypter("5554443322");

  //encryptMessage metodu kullanılarak "Hello World" metni "5553332211" telefon numarasına şifreleniyor ve şifreli metin "encryptedMessage" değişkenine atanıyor.
  let encryptedMessage = encrypterSender.encryptMessage("Hello World","5553332211");

  //Encrypter sınıfından bir örnek oluşturuluyor ve bu sefer "5553332211" şifreleme anahtarı ile oluşturuluyor.
  const encrypterReceiver = new Encrypter("5553332211");

  //decryptMessage metodu kullanılarak "encryptedMessage" değişkenindeki şifreli metin "5554443322" şifreleme anahtarı kullanılarak çözülüyor ve orijinal metin "decryptedMessage" değişkenine atanıyor.
  let decryptedMessage = encrypterReceiver.decryptMessage(encryptedMessage,"5554443322");

  //decryptMessage değişkenindeki orijinal metin konsola yazdırılıyor.
  console.log(decryptedMessage); //Hello World
  */
  constructor(key: string) {
    this.secretKey = "verysuper32bitsecretkeytopsecret"; //process.env.SECRET_KEY! as string;
    this.ecdh = this.createECDH(key);
  }

  public getPublicKey = (): string => {
    return this.ecdh.getPublicKey("hex");
  };

  private createECDH = (key: string): crypto.ECDH => {
    console.log(this.secretKey);
    let ecdh = crypto.createECDH("secp256k1");
    ecdh.setPrivateKey(Buffer.from(this.encrypt(this.secretKey, key)));
    return ecdh;
  };

  private encrypt = (key: string, text: string): string => {
    let cipher = crypto.createCipheriv("aes-256-ecb", key, "");
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  };

  private decrypt = (key: string, text: string): string => {
    let decipher = crypto.createDecipheriv("aes-256-ecb", key, "");
    let decrypted = decipher.update(text, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  };

  /**
   * Bu fonksiyon verilen key ile mesajı şifreler.
   * @param {string} text - Şifrelenecek Mesaj
   * @param {string} receiver - Mesajı alacak kişinin keyi
   * @returns {string} Şifreli Mesaj
   */
  public encryptMessage = (text: string, receiverKey: string): string => {
    let sharedKey = this.getSharedKey(receiverKey);
    let encrypted = this.encrypt(sharedKey, text);
    return encrypted;
  };

  /**
   * Bu fonksiyon verilen key ile oluşturulmuş mesajı çözer ve döndürür.
   * @param {string} text - Şifreli string
   * @param {string} sender - Mesajı gönderen kişinin keyi
   * @returns {string} Mesaj
   */
  public decryptMessage = (text: string, senderKey: string): string => {
    let sharedKey = this.getSharedKey(senderKey);
    var decrypted = this.decrypt(text, sharedKey);
    return decrypted;
  };
  private createSHA256 = (data: string) => {
    let hash = crypto.createHash("sha256").update(data).digest("hex");
    return hash.slice(0, 32);
  };

  private getSharedKey = (otherPublicKey: string): string => {
    let computedSecret = this.ecdh.computeSecret(otherPublicKey, "hex", "hex");
    let hash = this.createSHA256(computedSecret);
    return hash;
  };
}
