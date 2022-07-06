import { Injectable } from '@nestjs/common';
import DeviceDetector = require('device-detector-js');

@Injectable()
export class DeviceDetectorService {
  async parse(userAgent: string) {
    const deviceDetector = new DeviceDetector();
    return deviceDetector.parse(userAgent);
  }
}
