import os


def remove_text_from_filenames(directory, text_to_remove):
    """
    批量删除文件名中的指定文本

    Args:
        directory: 要处理的目录路径
        text_to_remove: 要删除的文本
    """
    # 计数器
    count = 0

    try:
        # 遍历目录及其子目录
        for root, dirs, files in os.walk(directory):
            for filename in files:
                # 检查文件名是否包含要删除的文本
                if text_to_remove in filename:
                    # 构建旧文件的完整路径
                    old_path = os.path.join(root, filename)

                    # 构建新文件名（删除指定文本）
                    new_filename = filename.replace(text_to_remove, '')

                    # 构建新文件的完整路径
                    new_path = os.path.join(root, new_filename)

                    try:
                        # 重命名文件
                        os.rename(old_path, new_path)
                        count += 1
                        print(f"已重命名: {filename} -> {new_filename}")
                    except Exception as e:
                        print(f"重命名文件 {filename} 时出错: {str(e)}")

        print(f"\n完成！共处理 {count} 个文件")

    except Exception as e:
        print(f"处理过程中出错: {str(e)}")


def main():
    # 获取要处理的目录路径
    directory = input("请输入要处理的目录路径: ").strip()

    # 检查目录是否存在
    if not os.path.exists(directory):
        print("错误：目录不存在！")
        return

    # 要删除的文本
    text_to_remove = "【海量一手：itgxb.com】"

    # 确认操作
    print(f"\n将要处理目录: {directory}")
    print(f"要删除的文本: {text_to_remove}")
    confirm = input("\n确认进行操作？(y/n): ").strip().lower()

    if confirm == 'y':
        remove_text_from_filenames(directory, text_to_remove)
    else:
        print("操作已取消")


if __name__ == "__main__":
    main()
