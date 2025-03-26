import Foundation
import React

@objc(MessagingInfo)
class MessagingInfo: NSObject {

  @objc func getSentMessage(_ message: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    let response = "Received: \(message) from native module IOS"
    resolve(["response": response])
  }
  
}
