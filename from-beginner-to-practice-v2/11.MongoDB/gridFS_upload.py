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

def upload_file_examples():
    """文件上传示例"""
    print("=== GridFS 文件上传示例 ===\n")

    # 示例1: 上传文本文件
    def upload_text_file():
        print("1. 上传文本文件")

        # 创建文本内容
        text_content = """
        这是一个测试文本文件。
        GridFS可以存储任何类型的文件。
        包括文本、图片、视频、音频等。
        """

        # 上传到GridFS
        file_id = fs.put(
            text_content.encode('utf-8'),  # 转换为bytes
            filename="test.txt",
            content_type="text/plain",
            metadata={
                "description": "测试文本文件",
                "category": "document",
                "uploaded_by": "admin"
            }
        )

        print(f"  ✓ 文本文件上传成功")
        print(f"  文件ID: {file_id}")
        print(f"  文件名: test.txt")
        return file_id

    # 示例2: 上传本地文件
    def upload_local_file():
        print("\n2. 上传本地文件")

        # 创建一个示例文件
        sample_file_path = "sample_document.txt"
        with open(sample_file_path, 'w', encoding='utf-8') as f:
            f.write("这是一个示例文档文件\n" * 100)  # 创建较大的文件

        try:
            # 读取并上传文件
            with open(sample_file_path, 'rb') as f:
                file_id = fs.put(
                    f,
                    filename=os.path.basename(sample_file_path),
                    content_type="text/plain",
                    metadata={
                        "original_path": sample_file_path,
                        "file_size": os.path.getsize(sample_file_path),
                        "upload_time": datetime.datetime.now()
                    }
                )

            print(f"  ✓ 本地文件上传成功")
            print(f"  文件ID: {file_id}")
            print(f"  文件大小: {os.path.getsize(sample_file_path)} 字节")

            # 清理示例文件
            os.remove(sample_file_path)
            return file_id

        except Exception as e:
            print(f"  ✗ 上传失败: {e}")
            return None

    # 示例3: 上传图片文件
    def upload_image_file():
        print("\n3. 上传图片文件")

        try:
            # 创建一个简单的图片
            img = Image.new('RGB', (20000, 20000), color='red')

            # 保存到内存
            img_buffer = io.BytesIO()
            img.save(img_buffer, format='PNG')
            img_buffer.seek(0)

            # 上传到GridFS
            file_id = fs.put(
                img_buffer.getvalue(),
                filename="red_square.png",
                content_type="image/png",
                metadata={
                    "width": 20000,
                    "height": 20000,
                    "format": "PNG",
                    "description": "红色方块图片"
                }
            )

            print(f"  ✓ 图片上传成功")
            print(f"  文件ID: {file_id}")
            print(f"  图片尺寸: 20000 * 20000")
            return file_id

        except Exception as e:
            print(f"  ✗ 图片上传失败: {e}")
            return None

    # 示例4: 批量上传文件
    def batch_upload_files():
        print("\n4. 批量上传文件")

        file_ids = []

        # 创建多个测试文件
        test_files = [
            ("document1.txt", "这是第一个文档"),
            ("document2.txt", "这是第二个文档"),
            ("document3.txt", "这是第三个文档")
        ]

        for filename, content in test_files:
            try:
                file_id = fs.put(
                    content.encode('utf-8'),
                    filename=filename,
                    content_type="text/plain",
                    metadata={
                        "batch_upload": True,
                        "upload_time": datetime.datetime.now()
                    }
                )
                file_ids.append(file_id)
                print(f"  ✓ {filename} 上传成功 (ID: {file_id})")

            except Exception as e:
                print(f"  ✗ {filename} 上传失败: {e}")

        print(f"  批量上传完成，成功上传 {len(file_ids)} 个文件")
        return file_ids

    # 执行所有上传示例
    # text_file_id = upload_text_file()
    # local_file_id = upload_local_file()
    image_file_id = upload_image_file()
    # batch_file_ids = batch_upload_files()

    return {
        # "text_file": text_file_id,
        # "local_file": local_file_id,
        "image_file": image_file_id,
        # "batch_files": batch_file_ids
    }

# 运行上传示例
if __name__ == "__main__":
    upload_file_examples()
