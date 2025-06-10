from mongo_db import client
import gridfs
from bson import ObjectId
import datetime
import os
import io
from PIL import Image
import json

# 创建GridFS实例
fs = gridfs.GridFS(client.school, collection="books")

def download_file_examples(file_ids):
    """文件下载示例"""
    print("\n=== GridFS 文件下载示例 ===\n")

    # 示例1: 根据文件ID下载
    def download_by_id(file_id):
        print(f"1. 根据ID下载文件: {file_id}")

        try:
            # 获取文件
            grid_out = fs.get(file_id)

            # 读取文件内容
            content = grid_out.read()

            print(f"  ✓ 文件下载成功")
            print(f"  文件名: {grid_out.filename}")
            print(f"  文件大小: {grid_out.length} 字节")
            print(f"  内容类型: {grid_out.content_type}")
            print(f"  上传时间: {grid_out.upload_date}")

            # 如果是文本文件，显示内容
            if grid_out.content_type == "text/plain":
                text_content = content.decode('utf-8')
                print(f"  文件内容预览: {text_content[:100]}...")

            return content

        except gridfs.NoFile:
            print(f"  ✗ 文件不存在: {file_id}")
            return None
        except Exception as e:
            print(f"  ✗ 下载失败: {e}")
            return None

    # 示例2: 根据文件名下载
    def download_by_filename(filename):
        print(f"\n2. 根据文件名下载: {filename}")

        try:
            # 根据文件名获取文件
            grid_out = fs.get_last_version(filename)

            content = grid_out.read()

            print(f"  ✓ 文件下载成功")
            print(f"  文件ID: {grid_out._id}")
            print(f"  文件大小: {grid_out.length} 字节")

            return content

        except gridfs.NoFile:
            print(f"  ✗ 文件不存在: {filename}")
            return None
        except Exception as e:
            print(f"  ✗ 下载失败: {e}")
            return None

    # 示例3: 下载并保存到本地
    def download_and_save(file_id, save_path):
        print(f"\n3. 下载并保存到本地: {save_path}")

        try:
            grid_out = fs.get(file_id)

            # 保存到本地文件
            with open(save_path, 'wb') as f:
                f.write(grid_out.read())

            print(f"  ✓ 文件已保存到: {save_path}")
            print(f"  文件大小: {os.path.getsize(save_path)} 字节")

            return True

        except Exception as e:
            print(f"  ✗ 保存失败: {e}")
            return False

    # 示例4: 流式下载大文件
    def stream_download(file_id):
        print(f"\n4. 流式下载文件: {file_id}")

        try:
            grid_out = fs.get(file_id)

            print(f"  文件名: {grid_out.filename}")
            print(f"  文件大小: {grid_out.length} 字节")

            # 分块读取
            chunk_size = 1024  # 1KB chunks
            total_read = 0

            while True:
                chunk = grid_out.read(chunk_size)
                if not chunk:
                    break

                total_read += len(chunk)
                progress = (total_read / grid_out.length) * 100
                print(f"  下载进度: {progress:.1f}% ({total_read}/{grid_out.length} 字节)", end='\r')

            print(f"\n  ✓ 流式下载完成")
            return True

        except Exception as e:
            print(f"  ✗ 流式下载失败: {e}")
            return False

    # 执行下载示例
    if file_ids.get("text_file"):
        download_by_id(file_ids["text_file"])

    download_by_filename("test.txt")

    if file_ids.get("image_file"):
        download_and_save(file_ids["image_file"], "mongodb_download.pic.png")
        stream_download(file_ids["image_file"])

# 运行上传示例
if __name__ == "__main__":
    download_file_examples({
        'text_file': 'test.txt',
        'image_file': ObjectId("68481b2f37267aebb55317bd")
    })

