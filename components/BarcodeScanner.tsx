"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import {
  BrowserQRCodeReader,
  ChecksumException,
  FormatException,
  NotFoundException,
} from "@zxing/library";
import { useEffect, useState, useMemo } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";

export default function QRCodeScanner() {
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [videoInputDevices, setVideoInputDevices] = useState<MediaDeviceInfo[]>(
    []
  );

  const codeReader = useMemo(() => new BrowserQRCodeReader(), []);

  console.log("ZXing code reader initialized");

  useEffect(() => {
    codeReader
      .getVideoInputDevices()
      .then((videoInputDevices) => {
        setupDevices(videoInputDevices);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [codeReader]);

  function setupDevices(videoInputDevices: MediaDeviceInfo[]) {
    // Selects the first device by default
    if (videoInputDevices[1])
      setSelectedDeviceId(videoInputDevices[1]?.deviceId);
    else setSelectedDeviceId(videoInputDevices[0]?.deviceId);

    // Set up the devices dropdown
    setVideoInputDevices(videoInputDevices);
  }

  function resetClick() {
    codeReader.reset();
    setCode("");
    console.log("Reset.");
  }

  function decodeContinuously(selectedDeviceId: string) {
    codeReader.decodeFromInputVideoDeviceContinuously(
      selectedDeviceId,
      "video",
      (result, err) => {
        if (result) {
          // Properly decoded QR code
          console.log("Found QR code!", result);
          setCode(result.getText());
        }

        if (err) {
          setCode("");

          // Handle specific exceptions
          if (err instanceof NotFoundException) {
            console.log("No QR code found.");
          }
          if (err instanceof ChecksumException) {
            console.log("A code was found, but its value was not valid.");
          }
          if (err instanceof FormatException) {
            console.log("A code was found, but it was in an invalid format.");
          }
        }
      }
    );
  }

  useEffect(() => {
    if (selectedDeviceId) {
      decodeContinuously(selectedDeviceId);
      console.log(`Started decoding from camera with id ${selectedDeviceId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDeviceId]);

  return (
    <section className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <Label htmlFor="sourceSelect">Change video source:</Label>
        </CardHeader>
        <CardContent>
          <Select onValueChange={(value) => setSelectedDeviceId(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Available Devices</SelectLabel>
                {videoInputDevices.map((device) => (
                  <SelectItem key={device.deviceId} value={device.deviceId}>
                    {device.label || `Camera ${device.deviceId}`}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="mt-4">
            <video id="video" width="300" height="200" className="rounded-lg" />
          </div>

          <Label className="mt-4">Result:</Label>
          <pre className="rounded-lg bg-gray-100 p-2">
            <code>{code || "No code detected"}</code>
          </pre>

          <Button variant="secondary" className="mt-4" onClick={resetClick}>
            Reset
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
