#!/usr/bin/env python3

print("🚀 Uploading Stemify Desktop builds to Hugging Face Spaces...")

try:
    from huggingface_hub import HfApi
    from huggingface_hub.utils import Repository
    import os
except ImportError:
    print("📦 Installing huggingface_hub...")
    import subprocess
    subprocess.run(["pip", "install", "huggingface_hub"])
    from huggingface_hub import HfApi
    from huggingface_hub.utils import Repository
    import os

# Files to upload
files = [
    "demucs-gui/dist-electron/Stemify Setup 1.0.0.exe",
    "demucs-gui/dist-electron/Stemify-1.0.0-arm64.dmg", 
    "demucs-gui/dist-electron/Stemify-1.0.0-arm64.AppImage"
]

# Repository name
repo_id = "huchukato/stemify-desktop"

try:
    # Create repository if it doesn't exist
    try:
        repo = Repository(repo_id, repo_type="model", private=False)
        print(f"✅ Created repository: {repo_id}")
    except Exception as e:
        if "already exists" in str(e):
            print(f"✅ Repository already exists: {repo_id}")
            repo = Repository(repo_id, repo_type="model")
        else:
            raise e
    
    # Upload files
    for file_path in files:
        if os.path.exists(file_path):
            filename = os.path.basename(file_path)
            print(f"📤 Uploading {filename}...")
            
            repo.upload_file(
                path_or_fileobj=file_path,
                path_in_repo=filename,
            )
            print(f"✅ Uploaded {filename}")
        else:
            print(f"❌ File not found: {file_path}")
    
    print(f"\n🎉 All files uploaded to: https://huggingface.co/{repo_id}")
    
except Exception as e:
    print(f"❌ Error: {e}")
    print("\n💡 Make sure to run: hf auth login")
