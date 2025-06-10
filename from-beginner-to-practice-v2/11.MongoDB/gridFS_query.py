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

def gridfs_management_examples():
    """GridFS管理示例"""
    print("\n=== GridFS 管理示例 ===\n")

    # 示例1: 列出所有文件
    def list_all_files():
        print("1. 列出所有文件")

        try:
            # 直接查询fs.files集合
            files_collection = client.school.books.files
            files = list(files_collection.find())

            print(f"  总文件数: {len(files)}")
            print("  文件列表:")

            for i, file_doc in enumerate(files, 1):
                print(f"    {i}. {file_doc['filename']}")
                print(f"       ID: {file_doc['_id']}")
                print(f"       大小: {file_doc['length']} 字节")
                print(f"       类型: {file_doc.get('contentType', 'unknown')}")
                print(f"       上传时间: {file_doc['uploadDate']}")

                # 显示元数据
                if 'metadata' in file_doc:
                    print(f"       元数据: {file_doc['metadata']}")
                print()

            return files

        except Exception as e:
            print(f"  ✗ 列出文件失败: {e}")
            return []

    # 示例2: 根据条件查询文件
    def query_files():
        print("2. 根据条件查询文件")

        try:
            files_collection = client.school.books.files

            # 查询文本文件
            text_files = list(files_collection.find({
                "contentType": "text/plain"
            }))
            print(f"  文本文件数量: {len(text_files)}")

            # 查询大文件（>1KB）
            large_files = list(files_collection.find({
                "length": {"$gt": 1024}
            }))
            print(f"  大文件数量（>1KB）: {len(large_files)}")

            # 查询最近上传的文件
            recent_files = list(files_collection.find({
                "uploadDate": {
                    "$gte": datetime.datetime.now() - datetime.timedelta(hours=24)
                }
            }))
            print(f"  最近1小时上传的文件: {len(recent_files)}")

            # 根据元数据查询
            batch_files = list(files_collection.find({
                "metadata.batch_upload": True
            }))
            print(f"  批量上传的文件: {len(batch_files)}")

        except Exception as e:
            print(f"  ✗ 查询文件失败: {e}")

    # 示例3: 获取文件详细信息
    def get_file_info(file_id):
        print(f"\n3. 获取文件详细信息: {file_id}")

        try:
            # 使用GridFS获取文件信息
            if fs.exists(file_id):
                grid_out = fs.get(file_id)

                print(f"  ✓ 文件存在")
                print(f"  文件名: {grid_out.filename}")
                print(f"  文件大小: {grid_out.length} 字节")
                # print(f"  内容类型: {grid_out.content_type}")
                print(f"  上传时间: {grid_out.upload_date}")
                # print(f"  MD5校验: {grid_out.md5}")

                # 显示元数据
                if hasattr(grid_out, 'metadata') and grid_out.metadata:
                    print(f"  元数据:")
                    for key, value in grid_out.metadata.items():
                        print(f"    {key}: {value}")

                # 显示分块信息
                chunks_collection = client.school.books.chunks
                chunks = list(chunks_collection.find({"files_id": file_id}))
                print(f"  分块数量: {len(chunks)}")

                return True
            else:
                print(f"  ✗ 文件不存在")
                return False

        except Exception as e:
            print(f"  ✗ 获取文件信息失败: {e}")
            return False

    # 示例4: 更新文件元数据
    def update_file_metadata(file_id, new_metadata):
        print(f"\n4. 更新文件元数据: {file_id}")

        try:
            files_collection = client.school.books.files

            # 更新元数据
            result = files_collection.update_one(
                {"_id": file_id},
                {"$set": {"metadata": new_metadata}}
            )

            if result.modified_count > 0:
                print(f"  ✓ 元数据更新成功")
                print(f"  新元数据: {new_metadata}")
                return True
            else:
                print(f"  ✗ 元数据更新失败或文件不存在")
                return False

        except Exception as e:
            print(f"  ✗ 更新元数据失败: {e}")
            return False

    # 示例5: 删除文件
    def delete_file(file_id):
        print(f"\n5. 删除文件: {file_id}")

        try:
            # 检查文件是否存在
            if fs.exists(file_id):
                # 获取文件信息
                grid_out = fs.get(file_id)
                filename = grid_out.filename

                # 删除文件
                fs.delete(file_id)

                print(f"  ✓ 文件删除成功")
                print(f"  已删除文件: {filename}")
                return True
            else:
                print(f"  ✗ 文件不存在")
                return False

        except Exception as e:
            print(f"  ✗ 删除文件失败: {e}")
            return False

    # 执行管理示例
    files = list_all_files()
    query_files()

    # 如果有文件，演示详细操作
    if files:
        first_file_id = files[0]['_id']
        get_file_info(first_file_id)

        # 更新元数据示例
        new_metadata = {
            "updated_at": datetime.datetime.now(),
            "status": "processed",
            "tags": ["important", "demo"]
        }
        update_file_metadata(first_file_id, new_metadata)

        # 注意：这里不删除文件，以免影响其他示例
        # delete_file(first_file_id)

# 运行上传示例
if __name__ == "__main__":
   gridfs_management_examples()

