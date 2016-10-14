//
//  BridgeManager.m
//
//  Created by Nick Hudkins on 12/13/15.
//

#import "RCTBridge.h"
#import "BridgeManager.h"

@implementation BridgeManager

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(reload)
{
  [_bridge reload];
}

@end
