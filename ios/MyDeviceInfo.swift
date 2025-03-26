import Foundation
import React

@objc(MyDeviceInfo)
class MyDeviceInfo: NSObject {

  @objc func getDeviceInfo(_ message: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    let response = "Received \(message) from native module"
    resolve(["response": response])
  }
  
}
