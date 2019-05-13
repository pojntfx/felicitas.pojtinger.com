#!/bin/bash
mogrify -format webp *.*
rm *.png
rm *.jpg
rm *~
