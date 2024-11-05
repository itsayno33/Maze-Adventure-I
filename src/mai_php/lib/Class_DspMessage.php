<?php
    // 画面表示用メッセージ(通常用とエラー用)のカプセル化
    class DspMessage {
        private bool  $isHTML;      // 表示先がHTMLか(true)、コンソールか(false)の指定
        private array $nor_message; // 文字列配列
        private array $err_message; // 文字列配列

        public function __construct(bool $isHTML = false) {
            $this->isHTML      = $isHTML;
            $this->nor_message = array();
            $this->err_message = array();
        }

        public function set_nor_message(string $msg): void {
            if ($msg != null) array_push($this->nor_message, $msg);
            return;
        }

        public function set_err_message(string $msg): void {
            if ($msg != null) array_push($this->err_message, $msg);
            return;
        }

        public function display_nor_message(): void {
            if (count($this->nor_message) < 1) return;
 
            if ($this->isHTML) {
                echo "<p class='normal_message'>\n";
                foreach($this->nor_message as $msg) echo "{$msg}</br>\n";
                echo "</p>\n";
            } else {
                foreach($this->nor_message as $msg) echo "{$msg}\n";
            }
            return;
        }
    
        public function display_err_message(): void {
            if (count($this->err_message) < 1) return;
    
            if ($this->isHTML) {
                echo "<p class='error_message'>\n";
                foreach($this->err_message as $msg) echo "{$msg}</br>\n";
                echo "</p>\n";
            } else {
                echo "\n\n\n###\n### ERROR Occuerd.\n###\n";
                foreach($this->err_message as $msg) echo "{### $msg}\n";
                echo "###\n\n";
            }
            return;
        }

        
        public function pdo_error(PDOException $e, string $errmsg): void {
            $this->set_err_message($errmsg);
            $this->set_err_message("code: {$e->getCode()}");
            $this->set_err_message("message: {$e->getMessage()}");
            return;
        }

    
        public function get_nor_messages(): array {
            return $this->nor_message;
        }
        public function get_err_messages(): array {
            return $this->err_message;
        }

        public function is_err(): bool {
            if (count($this->err_message) < 1) return false;
            return true;
        }
    }
?>