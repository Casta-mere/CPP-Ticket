#!/bin/bash

echo "👉 Installing dependencies and building run.exe..."
pyinstaller /cpp-ticket/run.spec
rm -rf /cpp-ticket/build
echo "✅ Build complete."