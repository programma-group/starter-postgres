#!/bin/sh
cd "$(dirname "$0")/../.."; #Sets script to 'src/scripts/../..' directory
cp .env.example .env;
cp .env.example .env.test;
echo "Generated .env and .env.test files";