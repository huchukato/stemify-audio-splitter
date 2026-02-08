#!/bin/bash

echo "🚀 Uploading Stemify Desktop builds to Hugging Face Spaces..."

# Check if huggingface_hub is installed
if ! command -v huggingface-cli &> /dev/null; then
    echo "📦 Installing huggingface_hub..."
    pip install huggingface_hub
fi

# Create a simple upload script
python3 << 'EOF'
from huggingface_hub import HfApi, Repository
import os

# Login to Hugging Face (you'll need to do this first)
# You need to run: huggingface-cli login

# Files to upload
files = [
    "demucs-gui/dist-electron/Stemify Setup 1.0.0.exe",
    "demucs-gui/dist-electron/Stemify-1.0.0-arm64.dmg", 
    "demucs-gui/dist-electron/Stemify-1.0.0-arm64.AppImage"
]

# Repository name
repo_id = "huchukato/stemify-desktop"

try:
    api = HfApi()
    
    # Create repository if it doesn't exist
    try:
        api.create_repo(
            repo_id=repo_id,
            repo_type="model",
            private=False,
            title="Stemify Desktop",
            description="Stemify - The Audio Splitter (Desktop Application)"
        )
        print(f"✅ Created repository: {repo_id}")
    except Exception as e:
        if "already exists" in str(e):
            print(f"✅ Repository already exists: {repo_id}")
        else:
            raise e
    
    # Upload files
    for file_path in files:
        if os.path.exists(file_path):
            filename = os.path.basename(file_path)
            print(f"📤 Uploading {filename}...")
            
            api.upload_file(
                path_or_fileobj=file_path,
                path_in_repo=filename,
                repo_id=repo_id,
                repo_type="model"
            )
            print(f"✅ Uploaded {filename}")
        else:
            print(f"❌ File not found: {file_path}")
    
    print(f"\n🎉 All files uploaded to: https://huggingface.co/{repo_id}")
    
except Exception as e:
    print(f"❌ Error: {e}")
    print("\n💡 Make sure to run: huggingface-cli login")
EOF

echo ""
echo "🔑 First, run: huggingface-cli login"
echo "📤 Then run: python3 upload_to_hf.py"
